"use client";

import React from "react";
import Image from "next/image";
import styles from "./content.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export type CarouselImageData = {
  src: any;
  srcDesktop: any;
  alt: string;
};

export default function HeroCarousel({
  images,
  isDesktop,
}: {
  images: CarouselImageData[];
  isDesktop: boolean;
}) {
  return (
    <div className={styles.carouselWrap}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className={styles.carousel}
      >
        {images.slice(0, 3).map((img, idx) => {
          const safeSrc = isDesktop ? img?.srcDesktop : img?.src;
          if (!safeSrc) return null;

          return (
            <SwiperSlide key={img?.alt || `slide-${idx}`}>
              <Image
                src={safeSrc}
                alt={img?.alt || `slide-${idx}`}
                className={styles.image}
                priority
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
