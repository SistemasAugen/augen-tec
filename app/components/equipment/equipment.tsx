import { Box, Grid, Hidden } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./equipment.module.css";
import Image, { StaticImageData } from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export const BorderPosition = {
  left: "left",
  right: "right",
};

export interface EquipmentModel {
  id?: string;
  imgData: {
    src: StaticImageData;
    alt: string;
    height?: string;
    width?: string;
  };
  colorBorder: {
    position: string;
    color: string;
  };
  title: string;
  text: string;
}

const Equipment = ({
  imgData,
  colorBorder,
  title,
  text,
  id,
}: EquipmentModel) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const currentImageRef = imageRef.current;
    const currentTextRef = textRef.current;

    AOS.init({
      duration: 900,
      easing: "ease",
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

    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    if (currentTextRef) {
      observer.observe(currentTextRef);
    }

    // Clean up the observer
    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
      if (currentTextRef) {
        observer.unobserve(currentTextRef);
      }
    };
  }, []);

  return (
    <Grid container className={styles.container} id={id || title}>
      {colorBorder.position == BorderPosition.left && (
        <Grid item xs={1} md={0.2} style={{ backgroundColor: colorBorder.color }}></Grid>
      )}
      <Grid
        item
        xs={11}
        className={
          colorBorder.position == BorderPosition.left
            ? styles.containerRight
            : styles.containerLeft
        }>
        <Image
          ref={imageRef}
          data-aos="fade-up"
          src={imgData.src}
          alt={imgData.alt}
          className={styles.image}
          style={{
            height: imgData.height || "auto",
            width: imgData.width || "auto",
          }}></Image>
        <div
          ref={textRef}
          data-aos={`${colorBorder.position == BorderPosition.right
            ? "fade-left"
            : "fade-right"
            }`}>
          <span className={styles.title}>{title}</span>
          <p className={styles.text}>{text}</p>
        </div>
      </Grid>
      {colorBorder.position == BorderPosition.right && (
        <Grid item xs={1} style={{ backgroundColor: colorBorder.color }}></Grid>
      )}
    </Grid>
  );
};

export default Equipment;
