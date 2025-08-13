"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "../ProductImage/ProductImage";

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
          width: "80vw",
          height: "500px",
        }}
        pagination
        autoplay={{
          delay: 4000,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={600}
              height={500}
              src={image}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
