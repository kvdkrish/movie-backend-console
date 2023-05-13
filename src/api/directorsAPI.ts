import { IDirector } from "contexts/MovieList";
import { getAllDirectors } from "graphql/Queries";
import { client } from "pages/_app";
import { useRef, useState } from "react"

interface IFetchDirectors {
  cbk?: (x?: IDirector) => void
}

export const useDirectorsAPI = () => {
  const [isFetching, setIsFetchig] = useState<boolean>(false);
  const directorsListRef = useRef<any>(null);

  const fetchDirectors = async ({ cbk }: IFetchDirectors = {}) => {
    setIsFetchig(true);
    const { data } = await client.query({
      query: getAllDirectors,
    });
    setIsFetchig(false);
    directorsListRef.current = data?.directors || [];
  };

  return {
    fetchDirectors,
    isFetching,
    directorsList: directorsListRef?.current,
  };
};
