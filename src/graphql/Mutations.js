import { gql } from "@apollo/client";

export const createMovie = gql`
	mutation CreateMovie(
		$title: String!
		$genre: String!
		$ratings: Float!
		$year: Int!
		$directorId: ID!
		$image: String
		$description: String
		$casts: [String]
	) {
		createMovie(
			title: $title
			genre: $genre
			ratings: $ratings
			year: $year
			directorId: $directorId
			image: $image
			description: $description
			casts: $casts
		) {
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

export const updateMovie = gql`
	mutation UpdateMovie(
		$id: ID!
		$title: String
		$image: String
		$genre: String
		$description: String
		$ratings: Float
		$year: Int
		$casts: [String]
		$directorId: ID
	) {
		updateMovie(
			id: $id
			title: $title
			image: $image
			genre: $genre
			description: $description
			ratings: $ratings
			year: $year
			casts: $casts
			directorId: $directorId
		) {
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

export const deleteMovie = gql`
	mutation DeleteMovie($id: ID!) {
		deleteMovie(id: $id) {
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
