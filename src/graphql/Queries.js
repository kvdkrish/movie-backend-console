import { gql } from "@apollo/client";

export const getAllMovies = gql`
	query GetAllMovies(
		$sort: MoviesSort
		$filter: MoviesFilter
		$limit: Int
		$offset: Int
	) {
		movies(sort: $sort, filter: $filter, limit: $limit, offset: $offset) {
			items {
				id
				title
				image
				genre
				description
				ratings
				year
				casts
				director {
					id
					name
					photo
					age
				}
			}
			totalCount
		}
	}
`;

export const getMovie = gql`
	query GetMovie($movieId: ID!) {
		movie(id: $movieId) {
			id
			title
			image
			genre
			description
			ratings
			year
			casts
			director {
				id
				name
				photo
				age
			}
		}
	}
`;

export const getAllDirectors = gql`
	query GetAllDirectors {
		directors {
			id
			name
			photo
			age
		}
	}
`;
