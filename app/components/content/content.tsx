"use client";

import { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./content.module.css";
import { Box, Grid, Hidden, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { esData } from "@/app/public/texts/es";
import YouTube from "react-youtube";
import { useMediaQuery } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export interface ImageData {
  src: StaticImageData;
  srcDesktop: StaticImageData;
  alt: string;
}

export interface CarouselImageData extends ImageData {}

export interface ContentProps {
  id?: string;
  imgData: ImageData;
  title: string;
  text: string;
  colorTitle?: { color: string; text: string };
  small?: boolean;
  sectionId: string;
  carouselImages?: CarouselImageData[];
}

const Content = ({ imgData, title, text, colorTitle, id, small, carouselImages }: ContentProps) => {
  const WA_URL =
  "https://wa.me/5214493864199?text=Hola%20quiero%20más%20información%20de%20Lab%20One";
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [headerIsSmall, setHeaderIsSmall] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 961px)");

  // ✅ key fix: only render Swiper after client mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const videoId = "pS-J14hPrlI";
  const opts = {
    width: "100%",
    height: "650px",
    playerVars: { autoplay: false },
  };

  useEffect(() => {
    const currentImageRef = imageRef.current;
    const currentTextRef = textRef.current;
    const onScroll = () => setHeaderIsSmall(window.pageYOffset > 0);

    AOS.init({
      duration: 900,
      easing: "ease",
      startEvent: "load",
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("aos-init", "aos-animate");
          }, 350);
        }
      });
    });

    if (currentImageRef) observer.observe(currentImageRef);

    if (currentTextRef) {
      observer.observe(currentTextRef);
      window.removeEventListener("scroll", onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (currentImageRef) observer.unobserve(currentImageRef);
      if (currentTextRef) observer.unobserve(currentTextRef);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isAugenCarousel =
    id === "AugenTec" && Array.isArray(carouselImages) && carouselImages.length > 0;

  const safeCarouselImages = useMemo(() => {
    if (!Array.isArray(carouselImages)) return [];
    // filter bad entries so Next/Image never crashes rendering
    return carouselImages
      .slice(0, 3)
      .filter((img) => !!img && (!!img.src || !!img.srcDesktop));
  }, [carouselImages]);

  const mdCols = isDesktop
    ? imgData.alt === "Torre augen labs"
      ? 12
      : imgData.alt === "Laboratorios augen labs"
      ? 6
      : 12
    : 12;

  return (
    <Grid container id={id || title}>
      <Grid item xs={12} md={mdCols} ref={imageRef} data-aos="fade-up">
        {isAugenCarousel && isMounted ? (
          <div className={styles.carouselWrap}>
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className={styles.carousel}
            >

            {safeCarouselImages.map((img, idx) => {
              const safeSrc = isDesktop ? img.srcDesktop : img.src;
              if (!safeSrc) return null;

              const isClickable = idx === 1 || idx === 2; // 2nd & 3rd slide

              return (
                <SwiperSlide key={img.alt || `slide-${idx}`}>
                  <div
                    style={{ width: "100%", height: "100%", cursor: isClickable ? "pointer" : "default" }}
                    onClick={() => {
                      if (isClickable) {
                        window.open(WA_URL, "_blank");
                      }
                    }}
                  >
                    <Image
                      src={safeSrc}
                      alt={img.alt || `slide-${idx}`}
                      className={styles.image}
                      priority
                    />
                  </div>
                </SwiperSlide>
              );
            })}

            </Swiper>
          </div>
        ) : (
          <Image
            src={isDesktop ? imgData.srcDesktop : imgData.src}
            alt={imgData.alt}
            className={styles.image}
            priority={id === "AugenTec"} // optional
          />
        )}
      </Grid>

      <Hidden mdUp>
        {/* mobil */}
        <Grid xs={12} item className={styles.textContainer} ref={textRef}>
          {colorTitle && (
            <span className={styles.colorTitle} style={{ color: colorTitle.color }}>
              {colorTitle.text}
            </span>
          )}
          <span className={styles.title}>{title}</span>
          <p className={styles.text}>{text}</p>
        </Grid>
      </Hidden>

      <Hidden mdDown>
        {/* desktop */}
        {colorTitle && (
          <Grid sm={12} md={6} item className={[styles.textContainer, styles.titleCenter].join(" ")} ref={textRef}>
            <Box className={[styles.textContainer, styles.textCenter, styles.titleCenter].join(" ")}>
              <div className={styles.labOne}>
                <span className={styles.colorTitle} style={{ color: colorTitle.color }}>
                  {colorTitle.text}
                </span>
              </div>
              <span className={[styles.title, styles.titleCenter].join(" ")}>{title}</span>
              <p className={[styles.text, styles.textCenter, styles.titleCenter].join(" ")}>{text}</p>
            </Box>
          </Grid>
        )}

        {title === "Adiós a los moldes." && (
          <Grid container>
            <Grid md={4} item className={[styles.textContainer, styles.titleCenter].join(" ")} ref={textRef}>
              <div className={styles.moldsContainer}>
                <span className={[styles.title, styles.titleCenter, styles.innovation].join(" ")}>
                  {esData.main[2].title}
                </span>
              </div>
              <Box className={[styles.textContainer, styles.textCenter, styles.titleCenter].join(" ")}>
                <div className={styles.innovationTextContainer}>
                  <p className={[styles.text, styles.textCenter, styles.titleCenter].join(" ")}>{esData.main[2].text}</p>
                </div>
              </Box>
            </Grid>
            <Grid md={8} item>
              <Box className={styles.videoPlayer}>
                <YouTube videoId={videoId} opts={opts} />
              </Box>
            </Grid>
          </Grid>
        )}

        {!colorTitle && id === "AugenTec" && (
          <Box>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={styles.innovationContainer}>
                  <Typography variant="h1" className={[styles.title, styles.titleCenter, styles.innovation].join(" ")}>
                    {title}
                  </Typography>
                </div>
              </Grid>
              <Grid item md={6}>
                <Box className={[styles.textContainer, styles.textCenter, styles.titleCenter].join(" ")}>
                  <div className={styles.innovationTextContainer}>
                    <p className={[styles.text, styles.textCenter, styles.titleCenter].join(" ")}>{text}</p>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Hidden>
    </Grid>
  );
};

export default Content;
