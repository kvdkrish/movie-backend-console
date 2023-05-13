import React, { useCallback, useContext, useEffect } from "react";
import Head from "next/head";
import { asRem, styled } from "styles/stitchesConfig";
import Grid from "components/Grid";
import { getAllMovies } from "graphql/Queries";
import { client } from "./_app";
import {
	IMovieList,
	MOVIELIST_ACTIONS,
	MovieListContext,
} from "contexts/MovieList";
import MovieForm from "components/MovieForm";
import GridActions from "components/GridActions";
import { useMoviesAPI } from "api/moviesAPI";
import Toast from "components/Toast";
import { useRouter } from "next/router";

export async function getServerSideProps() {
	const { data = {} } = await client.query({
		query: getAllMovies,
		variables: { limit: 2 },
	});

	return {
		props: { data: data?.movies },
	};
}

const VlDivider = styled("div", {
	border: `${asRem(1)} solid $colorGold`,
	borderRadius: asRem(50),
});

const MovieListWrapper = styled("div", {
	display: "flex",
	gap: asRem(15),
	".grid-actions": {
		flex: `0 0 ${asRem(250)}`,
	},
	".grid": {
		flex: 1,
		"&-header": {
			color: "$colorSecondary",
		},
		"&-content": {
			background: "$color1",
			color: "$colorSecondary",
			borderRadius: asRem(10),
			padding: asRem(20),
			height:
				"calc(100vh - $$topBarHeight - ($$yAxisPadding * 2) - ($$gridHeaderHeight + $$gridHeaderMb))",
			".card": {
				maxWidth: asRem(225),
				img: {
					minHeight: asRem(300),
				},
			},
		},
	},
});

export interface ISort {
	ratings?: string;
	title?: string;
	year?: string;
}

export interface IFilter {
	ratings?: any;
	year?: any;
}

export interface IFilterValue {
	operator: string;
	value: string | string[];
}

interface IMovieListProps {
	data?: IMovieList;
}

function MovieList({ data }: IMovieListProps) {
	const router = useRouter();
	const [movieListState, movieListDispatch] = useContext(MovieListContext);
	const { fetchMovie, isFetchLoading } = useMoviesAPI();
	const {
		showCreatePopup,
		movieList = {},
		filter = {},
		sort = {},
		searchValue,
		pagination,
		toast,
	} = movieListState;

	const handleOnCreate = useCallback(() => {
		movieListDispatch({
			type: MOVIELIST_ACTIONS.TOGGLE_POPUP,
			showCreatePopup: true,
		});
	}, []);

	const handleOnToggle = useCallback((val: boolean = false) => {
		movieListDispatch({
			type: MOVIELIST_ACTIONS.TOGGLE_POPUP,
			showCreatePopup: val,
		});
	}, []);

	const handleDoFetch = ({
		loadMore = false,
		sort: sortData,
		filter: filterData,
		searchTerm,
		offset,
		cbk,
	}: {
		loadMore?: boolean;
		offset?: number;
		sort?: ISort;
		filter?: IFilter;
		searchTerm?: string;
		cbk?: () => void;
	} = {}) => {
		fetchMovie({
			sort: sortData || sort,
			filter: filterData || filter,
			searchTerm: searchTerm || searchValue,
			offset: offset ?? pagination?.page,
			cbk: ({ items = [], totalCount: total = 0 }: IMovieList = {}) => {
				let tempData = loadMore
					? [
							...((movieList?.items?.length ? movieList.items : data?.items) ||
								[]),
							...items,
					  ]
					: [...items];
				movieListDispatch({
					type: MOVIELIST_ACTIONS.UPDATE_MOVIELIST,
					movieList: { items: tempData, totalCount: total },
				});
				cbk?.();
			},
		});
	};

	const handleOnSearch = useCallback(
		(val: string) => {
			handleDoFetch({
				searchTerm: val,
				cbk: () => {
					movieListDispatch({
						type: MOVIELIST_ACTIONS.UPDATE_SEARCH,
						searchValue: val,
					});
				},
			});
		},
		[handleDoFetch]
	);

	const handleOnLoadMore = useCallback(() => {
		const { page = 1, size } = pagination || {};
		handleDoFetch({
			loadMore: true,
			offset: page + 1,
			cbk: () => {
				movieListDispatch({
					type: MOVIELIST_ACTIONS.UPDATE_PAGINATION,
					pagination: { page: page + 1, size },
				});
			},
		});
	}, [pagination, handleDoFetch]);

	const handleOnClear = useCallback(() => {
		handleDoFetch({
			cbk: () => movieListDispatch({ type: MOVIELIST_ACTIONS.CLEAR_ALL }),
		});
	}, []);

	const handleOnToastClose = useCallback(() => {
		movieListDispatch({ type: MOVIELIST_ACTIONS.CLEAR_TOAST });
	}, []);

	const handleOnCreateMovieCbk = useCallback(() => {
		movieListDispatch({
			type: MOVIELIST_ACTIONS.UPDATE_TOAST,
			toast: {
				show: true,
				message: "Movie created successfully!",
			},
		});
		movieListDispatch({
			type: MOVIELIST_ACTIONS.UPDATE_MOVIELIST,
			movieList: {
				items: [
					...((movieList?.items?.length ? movieList.items : data?.items) || []),
				],
				totalCount: (movieList.totalCount || 0) + 1,
			},
		});
		movieListDispatch({ type: MOVIELIST_ACTIONS.CLEAR_ALL });
	}, [movieList]);

	const handleOnSortChange = useCallback(
		(key: string = "", val: string[] = []) => {
			handleDoFetch({
				sort: { [key]: val?.[0] || "" },
				cbk: () => {
					movieListDispatch({
						type: MOVIELIST_ACTIONS.UPDATE_SORT,
						sort: { [key]: val?.[0] || "" },
					});
					movieListDispatch({ type: MOVIELIST_ACTIONS.RESET_PAGINATION });
				},
			});
		},
		[handleDoFetch]
	);

	const handleOnFilterChange = useCallback(
		(key: string = "", { operator, value }: IFilterValue) => {
			handleDoFetch({
				filter: { ...filter, [key]: { operator, value } },
				cbk: () => {
					movieListDispatch({
						type: MOVIELIST_ACTIONS.UPDATE_FILTER,
						filter: { ...filter, [key]: { operator, value } },
					});
					movieListDispatch({ type: MOVIELIST_ACTIONS.RESET_PAGINATION });
				},
			});
		},
		[filter]
	);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MovieListWrapper>
				<Toast
					show={toast?.show}
					message={toast?.message}
					onClose={handleOnToastClose}
				/>
				<MovieForm
					show={showCreatePopup}
					onToggle={handleOnToggle}
					cbk={handleOnCreateMovieCbk}
				/>
				<GridActions
					sort={sort}
					filter={filter}
					onSortChange={handleOnSortChange}
					onFilterChange={handleOnFilterChange}
				/>
				<VlDivider />
				<Grid
					items={movieList?.items?.length ? movieList?.items : data?.items}
					searchedVal={searchValue}
					totalCount={
						movieList?.items?.length ? movieList?.totalCount : data?.totalCount
					}
					isLoading={isFetchLoading}
					onClear={handleOnClear}
					onLoadMore={handleOnLoadMore}
					onSearch={handleOnSearch}
					onCreate={handleOnCreate}
				/>
			</MovieListWrapper>
		</>
	);
}

export default React.memo(MovieList);
