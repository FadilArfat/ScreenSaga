import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Image } from "@nextui-org/react";

export const Slider = ({ data }) => {
  // Duplicate the first and last slides for loop mode
  const duplicatedData = data ? [data[data.length - 1], ...data, data[0]] : [];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      slidesPerGroup={1}
      navigation
      loop
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        stopOnLastSlide: false,
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-md my-4"
    >
      {duplicatedData?.map((movie, index) => (
        <SwiperSlide key={index} className="">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={`${movie?.title} poster`}
            className="object-cover"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
