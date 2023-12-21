import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Cards = ({ data }) => {
  return (
    <div>
      <Link to={`details/${data.id}`}>
        <Card
          isFooterBlurred
          className="relative w-full h-64 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
        >
          <Image
            removeWrapper
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
                : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019`
            }
            alt={`${data?.title} poster`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="w-full flex justify-between">
              <Chip
                color="secondary"
                startContent={<FaStar size={16} className="mx-1" />}
              >
                <span className="font-medium">
                  {data?.vote_average.toFixed(1)}
                </span>
              </Chip>
              <p className="font-medium text-white">
                {data?.release_date
                  ? dayjs(data?.release_date).format("MMM YYYY")
                  : "Unknown date"}
              </p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
