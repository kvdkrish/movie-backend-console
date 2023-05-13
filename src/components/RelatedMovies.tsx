import { useQuery } from "@apollo/client";
import { getAllMovies } from "graphql/Queries";
import React from "react";
import { asRem, styled } from "styles/stitchesConfig";
import Card from "./Card";
import Link from "next/link";
import { IMovieInfo } from "contexts/MovieList";
import Loader from "./Loader";

const RelatedMoviesWrapper = styled("div", {
	flex: "1",
	h3: {
		marginBottom: asRem(10),
	},
	">div": {
		position: "relative",
		height: "100%",
	},
	".related-movie-list": {
		$$flexGap: asRem(30),
		display: "flex",
		alignItems: "center",
		gap: "$$flexGap",
		width: "100%",
		a: {
			flex: "0 0 calc(100% / 2 - $$flexGap)",
			".card": {
				flex: 1,
				height: asRem(400),
			},
		},
	},
	".no-item": {
		height: asRem(400),
		padding: asRem(20),
		border: `${asRem(1)} dashed $colorSecondary`,
		borderRadius: asRem(10),
		background: "rgba($colorRGBWhite, 0.2)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

interface IRelatedMoviesProps {
	movieId?: string;
	directorId?: string;
}

function RelatedMovies({ movieId, directorId }: IRelatedMoviesProps) {
	const { data = {}, loading } = useQuery(getAllMovies, {
		variables: {
			sort: { ratings: "DESC" },
			filter: { directorId: { eq: directorId }, _id: { ne: movieId } },
			limit: 2,
		},
	});

	return (
		<RelatedMoviesWrapper>
			<h3>Related top rated movies</h3>
			<div>
				{loading ? (
					<Loader />
				) : (
					<>
						<div className="related-movie-list">
							{data?.movies?.items?.map((item: IMovieInfo) => (
								<Link key={item?.id} href={`/movie/${item?.id}`}>
									<Card item={item} />
								</Link>
							))}
						</div>
						{!data?.movies?.items?.length && (
							<div className="no-item">No related results found!</div>
						)}
					</>
				)}
			</div>
		</RelatedMoviesWrapper>
	);
}

export default React.memo(RelatedMovies);
