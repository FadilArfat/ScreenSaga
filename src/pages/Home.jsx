import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSearch, getUpcoming } from "../api/api";
import { Cards } from "../components/Cards";
import { Slider } from "../components/Slider";
import { Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useDebounce from "../hooks/useDebounce";

export const Home = () => {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 200);

  const {
    data: movies,
    isLoading: loadQuery,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) => getUpcoming(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  const {
    data: searchResults,
    isLoading: loadSearch,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: searchHasNextPage,
    isFetchingNextPage: searchIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: ({ pageParam = 1 }) =>
      getSearch({ keyword: debouncedSearchTerm, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    enabled: Boolean(debouncedSearchTerm),
  });

  const movieData = search ? searchResults : movies;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Slider data={movies?.pages[0]?.results ?? []} />
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
        <Input
          type="search"
          label="Search"
          isClearable
          radius="lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Movie"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          startContent={
            <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      <div className="my-2">
        <span className="text-xl text-white">Movies</span>
      </div>
      {loadQuery && (
        <div className="w-full p-12">
          <Spinner /> {search ? "Searching..." : "Loading..."}
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {movieData?.pages.map((page) =>
            page.results.map((movie) => <Cards key={movie.id} data={movie} />)
          )}
        </div>
        {searchIsFetchingNextPage && (
          <div className="w-full p-12">
            <Spinner /> Loading....
          </div>
        )}
        {!search && (
          <div className="flex justify-center my-4">
            <button
              onClick={() => {
                fetchNextPage();
              }}
              disabled={!hasNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loadQuery
                ? "Loading..."
                : hasNextPage
                ? "Load More"
                : "No More Data"}
            </button>
          </div>
        )}
        {search && (
          <div className="flex justify-center my-4">
            <button
              onClick={() => {
                fetchNextSearchPage();
              }}
              disabled={!searchHasNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loadSearch
                ? "Loading..."
                : searchHasNextPage
                ? "Load More"
                : "No More Data"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
