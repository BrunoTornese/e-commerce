"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  classname?: string;
}

export const ProductMobileSlideshow = ({ images, title, classname }: Props) => {
  return (
    <div className={classname}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{
          delay: 4000,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
