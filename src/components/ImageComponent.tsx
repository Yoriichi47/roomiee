"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface props {
  photo: string[];
}

const ImageComponent = ({ photo }: props) => {
  return (
    <>
      <div className="shadow-lg transition-all hover:shadow-xl min-h-[50vh]">
        <Swiper
          className="rounded-xl lg:w-[40vw] h-full"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {photo.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                className="border border-gray-200 h-[50vh] rounded-xl"
                width={900}
                height={400}
                src={img}
                alt={""}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ImageComponent;
