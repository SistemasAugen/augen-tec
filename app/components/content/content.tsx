import { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./content.module.css";
import { Box, Grid, Hidden } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { detectContentType } from "next/dist/server/image-optimizer";
//
import { esData } from "@/app/public/texts/es";
import YouTube from "react-youtube";


export interface ContentProps {
  id?: string;
  imgData: {
    src: StaticImageData;
    alt: string;
  };
  title: string;
  text: string;
  colorTitle?: { color: string; text: string };
  small?: boolean;
  sectionId: string;
}

const Content = ({ imgData, title, text, colorTitle, id, small }: ContentProps) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [headerIsSmall, setHeaderIsSmall] = useState(false);

  const videoId = "pS-J14hPrlI";
  const opts = {
    width: "100%",
    height: "500px",
    playerVars: {
      autoplay: false,
    },
  };

  useEffect(() => {
    const currentImageRef = imageRef.current;
    const currentTextRef = textRef.current;
    const onScroll = () => setHeaderIsSmall(window.pageYOffset > 0);

    AOS.init({
      duration: 900,
      easing: "ease",
      startEvent: 'load',
    });

    // window.addEventListener('load', () => {
    //   AOS.init({
    //     duration: 900,
    //     easing: "ease",
    //   });
    // })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("aos-init", "aos-animate");
          }, 350);
        }
      });
    });

    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    if (currentTextRef) {
      observer.observe(currentTextRef);
      window.removeEventListener("scroll", onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Clean up the observer
    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
      if (currentTextRef) {
        observer.unobserve(currentTextRef);
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  return (
    <Grid container id={id || title} >
      <Grid
        item
        xs={12}
        md={imgData.alt === "Torre augen labs" ? 12 : imgData.alt === "Laboratorios augen labs" ? 6 : 12}
        ref={imageRef}
        data-aos="fade-up"
      >
        <Image
          src={imgData.src}
          alt={imgData.alt}
          className={styles.image}>
        </Image>
      </Grid>
      <Hidden mdUp> {/* mobil */}
        <Grid
          xs={12}
          item
          className={styles.textContainer}
          ref={textRef}
        >
          {colorTitle && (
            <span
              className={styles.colorTitle}
              style={{ color: colorTitle.color }}>
              {colorTitle.text}
            </span>
          )}
          <span className={styles.title}>{title}</span>
          <p className={styles.text}>{text}</p>
        </Grid>
      </Hidden>
      <Hidden mdDown> {/* desktop */}
        {colorTitle && (
          <Grid
            sm={12}
            md={colorTitle.text === "LabONE" ? 6 : 6}
            item
            className={[styles.textContainer, styles.titleCenter].join(" ")}
            ref={textRef}
          >
            <div className={styles.horizontalLine} />
            <div className={styles.labOne}>
              <span
                className={styles.colorTitle}
                style={{ color: colorTitle.color }}>
                {colorTitle.text}
              </span>
            </div>
            <Box className={[styles.textContainer, styles.textCenter, styles.titleCenter].join(" ")}>
              <span className={[styles.title, styles.titleCenter].join(" ")}>{title}</span>
              <p className={[styles.text, styles.textCenter, styles.titleCenter].join(" ")}>{text}</p>
            </Box>
          </Grid>
        )}
        {/* // */}
        {/* Adiós a los moldes section */}
        {title === "Adiós a los moldes." && (
          <Grid container>
            <Grid
              md={title === "Adiós a los moldes." ? 6 : 6}
              item
              className={[styles.textContainer, styles.titleCenter].join(" ")}
              ref={textRef}
            >
              <div className={styles.moldsContainer}>
                <span className={[styles.title, styles.titleCenter, styles.innovation].join(" ")}>
                  {esData.main[2].title}
                </span>
              </div>
              <Box className={[styles.textContainer, styles.textCenter, styles.titleCenter].join(" ")}>
                <div className={styles.innovationTextContainer}>
                  <p className={[styles.text, styles.textCenter, styles.titleCenter].join(" ")}>
                    {esData.main[2].text}
                  </p>
                </div>
              </Box>
            </Grid>
            <Grid md={6} item>
              <Box>
                <YouTube className={styles.videoPlayer} videoId={videoId} opts={opts} />
              </Box>
            </Grid>
          </Grid>

        )}
        {/* innovacion y desarrollo */}
        {!colorTitle && id === 'AugenTec' && (
          <Box>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={styles.innovationContainer}>
                  <span className={[styles.title, styles.titleCenter, styles.innovation].join(" ")}>{title}</span>
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
      </Hidden >
    </Grid >
  );
};

export default Content;
