import { IFilter, IMovieInfo, IMovieList, ISort } from "contexts/MovieList";
import { updateMovie, createMovie, deleteMovie } from "graphql/Mutations";
import { getAllMovies } from "graphql/Queries";
import { client } from "pages/_app";
import { useState } from "react";

interface IMovieArgs {
  sort?: any
  filter?: any
  limit?: number
  offset?: number
  searchTerm?: string
  cbk?: (x?: IMovieList) => void
}

interface IMovieCreateMutation {
  input: IMovieInfo;
  cbk?: (x?: IMovieInfo) => void;
}

interface IMovieUpdateMutation {
  input: IMovieInfo;
  cbk?: (x?: IMovieInfo) => void;
}

interface IMovieDeleteMutation {
  id: string;
  cbk?: (x?: IMovieInfo) => void;
}

const getSortQueryParams = (sort: ISort) => {
  const sortData: any = {};
  Object?.entries(sort)?.forEach(([k, v]: any) => {
    if (v) sortData[k] = v === "asc" ? "ASC" : "DESC";
  });
  return sortData;
};

const getFilterQueryParams = (filter: IFilter) => {
  return Object?.fromEntries(
    Object?.entries(filter)?.map(([k, v]: any) => {
      const { operator, value } = v || {};
      if (operator === "range") {
        return [
          k,
          { gte: parseInt(value[0], 10), lte: parseInt(value[1], 10) },
        ];
      }
      return [k, { [operator]: parseInt(value, 10) }];
    })
  );
};

let apolloClientCache = {};

export const useMoviesAPI = () => {
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchMovie = async ({ sort, filter, limit = 2, offset = 1, searchTerm = '', cbk }: IMovieArgs = {}) => {
    setIsFetchLoading(true);
    const inputData = {
      sort: getSortQueryParams(sort),
      filter: {
        ...getFilterQueryParams(filter),
        ...(searchTerm ? { title: { regex: searchTerm } } : {}),
      },
      offset,
      limit,
    };
    apolloClientCache = { sort: inputData?.sort, filter: inputData?.filter };
    const { data } = await client.query({
      query: getAllMovies,
      variables: inputData,
    });
    setIsFetchLoading(false);
    cbk?.(data?.movies);
  };

  const doCreate = async ({ input, cbk }: IMovieCreateMutation) => {
    setIsCreating(true);
    const { data } = await client.mutate({
      mutation: createMovie,
      variables: { ...input },
      refetchQueries: [{
        query: getAllMovies,
        variables: apolloClientCache,
      }],
    });
    setIsCreating(false);
    cbk?.(data?.createMovie);
  };

  const doUpdate = async ({ input, cbk }: IMovieUpdateMutation) => {
    setIsUpdating(true);
    const { data } = await client.mutate({
      mutation: updateMovie,
      variables: { ...input },
    });
    setIsUpdating(false);
    cbk?.(data?.updateMovie);
  };

  const doDelete = async ({ id, cbk }: IMovieDeleteMutation) => {
    setIsDeleting(true);
    debugger;
    const { data } = await client.mutate({
      mutation: deleteMovie,
      variables: { id },
    });
    setIsDeleting(false);
    cbk?.(data?.deleteMovie);
  };

  return {
    isFetchLoading,
    fetchMovie,
    isCreating,
    doCreate,
    isUpdating,
    doUpdate,
    isDeleting,
    doDelete,
  };
};
