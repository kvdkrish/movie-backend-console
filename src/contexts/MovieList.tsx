import React, { useMemo, useReducer } from "react";

interface IMovieListProviderProps {
	children: React.ReactElement;
}

export interface IDirector {
	id?: string;
	name?: string;
	photo?: string;
	age?: number;
}

export interface IMovieInfo {
	id?: string;
	title?: string;
	genre?: string;
	ratings?: number;
	year?: number;
	casts?: string[];
	directorId?: string;
	director?: IDirector;
	description?: React.ReactElement;
}

export interface ISort {
	ratings?: any;
	title?: any;
	year?: any;
}

export interface IFilter {
	ratings?: any;
	year?: any;
}

export interface IPagination {
	page?: number;
	size?: number;
}

export interface IMovieList {
	items?: IMovieInfo[];
	totalCount?: number;
}

export interface IToast {
	show?: boolean;
	message?: string;
}

interface IDefaultMLContextProps {
	showCreatePopup?: boolean;
	movieInfo?: IMovieInfo;
	movieList?: IMovieList;
	sort?: ISort;
	filter?: IFilter;
	searchValue?: string;
	pagination?: IPagination;
	toast?: IToast;
}

interface IActionProps extends IDefaultMLContextProps {
	type: string;
	cbk?: () => void;
}

export enum MOVIELIST_ACTIONS {
	TOGGLE_POPUP = "toggle_popup",
	UPDATE_MOVIEINFO = "update_movieInfo",
	CLEAR_MOVIEINFO = "clear_movieInfo",
	UPDATE_MOVIELIST = "update_movieList",
	CLEAR_MOVIELIST = "clear_movieList",
	UPDATE_SORT = "update_sort",
	UPDATE_FILTER = "update_filter",
	UPDATE_SEARCH = "update_search",
	UPDATE_PAGINATION = "update_pagination",
	RESET_PAGINATION = "reset_pagination",
	CLEAR_ALL = "clear_all",
	UPDATE_TOAST = "update_toast",
	CLEAR_TOAST = "clear_toast",
}

const defaultMLContextProps: IDefaultMLContextProps = {
	showCreatePopup: false,
	movieInfo: {},
	movieList: { items: [], totalCount: 0 },
	sort: {},
	filter: {},
	searchValue: "",
	pagination: { page: 1, size: 2 },
	toast: { show: false, message: "" },
};

const movieListReducer = (
	state: IDefaultMLContextProps,
	action: IActionProps
) => {
	// console.log("reducer", action);
	switch (action?.type) {
		case MOVIELIST_ACTIONS.TOGGLE_POPUP:
			state.showCreatePopup = action?.showCreatePopup;
			break;
		case MOVIELIST_ACTIONS.UPDATE_MOVIEINFO:
			state.movieInfo = action?.movieInfo;
			break;
		case MOVIELIST_ACTIONS.CLEAR_MOVIEINFO:
			state.movieInfo = defaultMLContextProps?.movieInfo;
			break;
		case MOVIELIST_ACTIONS.UPDATE_MOVIELIST:
			state.movieList = action?.movieList;
			break;
		case MOVIELIST_ACTIONS.CLEAR_MOVIELIST:
			state.movieList = defaultMLContextProps?.movieList;
			break;
		case MOVIELIST_ACTIONS.UPDATE_SORT:
			state.sort = action?.sort;
			break;
		case MOVIELIST_ACTIONS.UPDATE_FILTER:
			state.filter = action?.filter;
			break;
		case MOVIELIST_ACTIONS.UPDATE_SEARCH:
			state.searchValue = action?.searchValue;
			break;
		case MOVIELIST_ACTIONS.UPDATE_PAGINATION:
			state.pagination = action?.pagination;
			break;
		case MOVIELIST_ACTIONS.RESET_PAGINATION:
			state.pagination = defaultMLContextProps?.pagination;
			break;
		case MOVIELIST_ACTIONS.CLEAR_ALL:
			state.sort = defaultMLContextProps?.sort;
			state.filter = defaultMLContextProps?.filter;
			state.searchValue = defaultMLContextProps?.searchValue;
			break;
		case MOVIELIST_ACTIONS.UPDATE_TOAST:
			state.toast = {
				show: action?.toast?.show ?? state?.toast?.show,
				message: action?.toast?.message ?? state?.toast?.message,
			};
			break;
		case MOVIELIST_ACTIONS.CLEAR_TOAST:
			state.toast = defaultMLContextProps?.toast;
			break;
		default:
			console.log(`No Actions for type ${action?.type}!`);
	}

	if (action?.cbk) action?.cbk?.();
	return { ...state };
};

export const MovieListContext = React.createContext<
	[IDefaultMLContextProps, React.Dispatch<IActionProps>]
>([defaultMLContextProps, () => {}]);

function MovieListProvider({ children }: IMovieListProviderProps) {
	const [movieListState, movieListDispatch] = useReducer(
		movieListReducer,
		defaultMLContextProps
	);

	return (
		<MovieListContext.Provider value={[movieListState, movieListDispatch]}>
			{children}
		</MovieListContext.Provider>
	);
}

export default MovieListProvider;
