import { Spinner, Image, Card, CardBody, CardFooter } from "@nextui-org/react";

export const CastList = ({ isLoading, castList }) => {
  return (
    <section>
      <h2 className="text-4xl text-left font-bold my-8">Cast</h2>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {castList.map((cast) => (
          <Card shadow="sm" key={cast.cast_id} isPressable>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={cast.original_name}
                loading="lazy"
                className="w-full object-cover h-[200px]"
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
                }
              />
            </CardBody>
            <CardFooter className="text-small flex flex-col flex-grow">
              <b>{cast.original_name}</b>
              <p className="text-default-500">{cast.character}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
