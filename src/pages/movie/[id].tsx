import { useMoviesAPI } from "api/moviesAPI";
import DeleteMoviePopup from "components/DeleteMoviePopup";
import MovieForm from "components/MovieForm";
import RelatedMovies from "components/RelatedMovies";
import SvgIcon from "components/SvgIcon";
import Toast from "components/Toast";
import { IMovieInfo, IToast } from "contexts/MovieList";
import { getMovie } from "graphql/Queries";
import Link from "next/link";
import { client } from "pages/_app";
import React, { useCallback, useState } from "react";
import { Button, asRem, styled } from "styles/stitchesConfig";
import { useRouter } from "next/router";

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }: any) {
	const { data } = await client.query({
		query: getMovie,
		variables: { movieId: params?.id },
		fetchPolicy: "network-only",
	});

	return {
		props: { params, data: { ...data?.movie } },
		revalidate: 30,
	};
}

const MovieDetailWrapper = styled("div", {
	a: {
		display: "flex",
		alignItems: "center",
		color: "$colorSecondary",
		marginBottom: asRem(10),
		width: "fit-content",
		svg: {
			marginRight: asRem(10),
		},
	},
	".container": {
		background: "$color1",
		color: "$colorSecondary",
		borderRadius: asRem(10),
		padding: asRem(20),
		display: "flex",
		flexDirection: "column",
		">div": {
			display: "flex",
			gap: asRem(10),
			">img": {
				flex: "0 0 20%",
				minHeight: asRem(400),
			},
			".info": {
				flex: "0 0 40%",
				overflow: "hidden",
				padding: asRem(10),
				label: {
					fontSize: asRem(18),
					marginRight: asRem(15),
				},
				span: {
					color: "$color3",
				},
				".btn-wrapper": {
					marginBottom: asRem(30),
				},
				".btn-edit": {
					marginRight: asRem(10),
				},
				hr: {
					margin: `${asRem(15)} 0`,
				},
				".info-group.casts": {
					display: "flex",
					alignItems: "center",
					ul: {
						listStyle: "none",
						display: "flex",
						gap: asRem(10),
						margin: 0,
						padding: 0,
						li: {
							color: "$color3",
						},
					},
				},
			},
		},
	},
});

interface IMovieDetailProps {
	data?: IMovieInfo;
	params?: any;
}

function MovieDetail({ data = {} }: IMovieDetailProps) {
	const [movieData, setMovieData] = useState(data);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [showDelPopup, setShowDelPopup] = useState<boolean>(false);
	const [toast, setToast] = useState<IToast>({ show: false, message: "" });
	const { doDelete } = useMoviesAPI();
	const router = useRouter();

	const handleOnToggle = useCallback((val: boolean = false) => {
		setShowPopup(val);
	}, []);

	const handleOnDelToggle = useCallback((val: boolean = false) => {
		setShowDelPopup(val);
	}, []);

	const handleOnEdit = () => {
		setShowPopup(true);
	};

	const handleOnDelete = () => {
		setShowDelPopup(true);
	};

	const handleOnDeleteAPI = useCallback(() => {
		if (!movieData?.id) return;
		doDelete({
			id: movieData?.id,
			cbk: (val: IMovieInfo = {}) => {
				setShowDelPopup(false);
				setToast({ show: true, message: "Movie deleted successfully!" });
				setTimeout(() => {
					if (val?.id) client.clearStore();
					router?.replace("/");
				}, 1000);
			},
		});
	}, [movieData]);

	const handleOnToastClose = useCallback(() => {
		setToast({ show: false, message: "" });
	}, []);

	const handleOnEditCbk = useCallback((val: IMovieInfo) => {
		// router.reload();
		setMovieData({ ...val });
	}, []);

	return (
		<MovieDetailWrapper>
			<Toast
				show={toast?.show}
				message={toast?.message}
				onClose={handleOnToastClose}
			/>
			<Link href="/">
				<SvgIcon name="backArrow" options={{ fill: "#ffffff" }} />
				<strong>back</strong>
			</Link>
			<div className="container">
				<MovieForm
					show={showPopup}
					onToggle={handleOnToggle}
					data={data}
					cbk={handleOnEditCbk}
				/>
				<DeleteMoviePopup
					show={showDelPopup}
					onToggle={handleOnDelToggle}
					title={data?.title || ""}
					onDelete={handleOnDeleteAPI}
				/>
				<div>
					<img src="#" />
					<div className="info">
						<div className="btn-wrapper">
							<Button
								styled="normal"
								className="btn-edit"
								type="button"
								onClick={handleOnEdit}
							>
								Edit
							</Button>
							<Button
								styled="normal"
								className="btn-del"
								type="button"
								onClick={handleOnDelete}
							>
								Delete
							</Button>
						</div>
						<div className="info-group">
							<label>Title</label>
							<span>{movieData?.title}</span>
						</div>
						<hr />
						<div className="info-group">
							<label>Genre</label>
							<span>{movieData?.genre}</span>
						</div>
						<hr />
						<div className="info-group">
							<label>Year</label>
							<span>{movieData?.year}</span>
						</div>
						<hr />
						<div className="info-group">
							<label>Ratings</label>
							<span>{movieData?.ratings}</span>
						</div>
						<hr />
						<div className="info-group">
							<label>Director</label>
							<span>{movieData?.director?.name}</span>
						</div>
						<hr />
						<div className="info-group casts">
							<label>Casts</label>
							<ul>
								{movieData?.casts?.map((cast: string) => (
									<li key={cast}>{cast}</li>
								))}
							</ul>
						</div>
					</div>
					<RelatedMovies
						movieId={movieData?.id}
						directorId={movieData?.director?.id}
					/>
				</div>
				<p>A test {movieData?.description}</p>
			</div>
		</MovieDetailWrapper>
	);
}

export default React.memo(MovieDetail);
