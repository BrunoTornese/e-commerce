"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../ProductImage/ProductImage";

interface Props {
  images: string[];
  title: string;
  classname?: string;
}

export const ProductSlideshow = ({ images, title, classname }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={`max-w-3xl mx-auto ${classname}`}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 4000,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroy ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
        initialSlide={activeIndex}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={1024}
              height={800}
              src={image}
              alt={title}
              className="rounded-lg object-contain w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
