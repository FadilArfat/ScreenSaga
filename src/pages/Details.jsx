import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../api/api";
import { Image } from "@nextui-org/react";
import dayjs from "dayjs";
import MainLayout from "../layout/main-layout";
import { CastList } from "../components/CastList";
import { IoIosArrowForward } from "react-icons/io";

export default function Details() {
  let { movieId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["moviesDetail", movieId],
    queryFn: () => getDetails({ movieId }),
  });
  //   console.log(data);
  const calcTime = (time) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };
  const movieDirector = data?.credits?.crew.find(
    (c) => c.job === "Director"
  )?.original_name;
  const movieScreenplay = data?.credits?.crew.find(
    (c) => c.job === "Screenplay"
  )?.original_name;

  return (
    <MainLayout>
      <div className=" flex align-middle items-center text-start pb-4 w-full h-auto font-bold text-2xl">
        <Link to={"/"} className="text-blue-500 hover:text-blue-700 ">
          Discover
        </Link>
        <IoIosArrowForward className="align-middle" />
        <p>{data?.title}</p>
      </div>

      <div className="flex flex-col items-start justify-start min-h-screen">
        <div
          className="w-full bg-auto bg-no-repeat bg-center rounded-3xl overflow-hidden object-contain "
          style={{
            backgroundImage: data?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w1280/${data?.backdrop_path})`
              : "none",
          }}
        >
          <div className=" w-full h-full backdrop-blur grid grid-cols-[25%_auto] gap-5 p-8">
            <Image
              src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
              className=" w-64 shadow-2xl m-4"
              loading="lazy"
            />

            <div className="p-8 col-span-1 items-start text-left">
              <p className="text-white text-3xl font-bold">{`${
                data?.title
              } (${dayjs(data?.release_date).year()})`}</p>
              <div className="flex my-1">
                <p className="text-white font-normal">{`${data?.release_date} • `}</p>
                {data?.genres.map((gnr) => (
                  <p key={gnr.id}>{`${gnr.name}, `}</p>
                ))}
                <span>•</span>
                {data?.runtime && (
                  <>
                    <span>{calcTime(data?.runtime)}</span>
                  </>
                )}
                {/* Add other information you want to display */}
              </div>
              <div className="mt-8">
                <p className="font-bold text-2xl">Overview</p>
                <p className="text-white mt-2">{data?.overview}</p>
              </div>
              <div className="mt-8 grid grid-cols-2">
                <div>
                  <p className="font-bold">{movieDirector}</p>
                  <p>Director</p>
                </div>
                <div>
                  <p className="font-bold">{movieScreenplay}</p>
                  <p>ScreenPlay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CastList castList={data?.credits?.cast || []} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
}
