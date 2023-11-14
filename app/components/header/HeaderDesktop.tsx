import { Grid, List, ListItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import logoImg from "@/images/Logo.png";
import styles from "./header.module.css";
import { MenuOption } from '../menu/menu';
import Link from "next/link";

export default function HeaderDesktop() {
  const MenuOptions_: MenuOption[] = [
    { value: "AUGEN TEC", key: "AugenTec" },
    { value: "SISTEMA LAB ONE", key: "Sistema" },
    { value: "MAQUINARIA", key: "Maquinaria" },
    { value: "CONTÁCTANOS", key: "Contacto" },
  ];
  return (
    <Grid container className={styles.headerContainer}>
      <Grid item xs={6} md={4} className={styles.logoContainer}>
        <Image src={logoImg} alt="Augen-tec" className={styles.logo}></Image>
      </Grid>
      <Grid item xs={4} md={2}></Grid>
      <Grid item xs={2} md={6} className={styles.menuIcon}>
        {MenuOptions_.map(option => (
          <Link href={`#${option.key}`} key={option.key} className={[styles.link, styles.menuItem].join(" ")}>
            {option.value}
          </Link>
        ))}
      </Grid>
    </Grid>
  );
}