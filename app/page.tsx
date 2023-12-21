"use client";
import { esData } from "./public/texts/es";
import Header from "./components/header/Header";
import Content from "./components/content/content";
import Equipment from "./components/equipment/equipment";
import Contact from "./components/contact/contact";
import Menu, { MenuOption } from "./components/menu/menu";
import YouTube from "react-youtube";
import localFont from "next/font/local";
import styles from "./page.module.css";
const Raleway = localFont({
  src: "../app/public/fonts/Raleway-VariableFont_wght.ttf",
});
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Box, Grid, Hidden, useMediaQuery } from "@mui/material";
import { AppContextProvider } from "./page-context";
import Footer from "./components/footer/footer";

const videoId = "pS-J14hPrlI";
const opts = {
  width: "100%",
  height: "500px",
  playerVars: {
    autoplay: false,
  },
};
export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 961px)');
  const handleDownloadBrochureClick = () => {
    window.open("https://drive.google.com/file/d/1RAuDk30IpJ31xpRMts0wAa5XoSrpgWmg/view?pli=1", "_blank");
  };

  // Esto debe coincidir con el id establecido en /public/texts/es.ts
  const MenuOptions: MenuOption[] = [
    { value: "AUGEN TEC", key: "AugenTec" },
    { value: "SISTEMA LAB ONE", key: "Sistema" },
    { value: "MAQUINARIA", key: "Maquinaria" },
    { value: "CONTÁCTANOS", key: "Contacto" },
  ];

  return (
    <AppContextProvider>
      <div className={styles.stickyMenu}>
        <Header></Header>
      </div>
      <main className={Raleway.className}>
        <Menu MenuOptions={MenuOptions} />
        <Grid container className={styles.equipmentContainer}>
          {esData.main.map((item) => {
            return (
              <Grid item xs={12} md={12} key={item.id || item.title}>
                <Content
                  id={item.id}
                  key={item.imageData.alt}
                  imgData={item.imageData}
                  colorTitle={item.colorTitle}
                  title={item.title}
                  text={item.text}
                  sectionId={""}
                ></Content>
              </Grid>
            );
          })}
        </Grid>
        <Hidden mdUp> {/* mobil */}
          <Grid xs={12} item>
            <YouTube className={styles.videoPlayer} videoId={videoId} opts={opts} />
          </Grid>
        </Hidden>
        <Grid container className={styles.equipmentContainer} id={MenuOptions[2].key}>
          <Hidden mdDown> {/* desktop */}
            <Grid md={4} item>
              <Box>
                <h1 className={styles.machineTitle}>Maquinaria</h1>
              </Box>
            </Grid>
            <Grid md={8}>
              <div className={styles.horizontalLine} />
            </Grid>
          </Hidden>
          {esData.equipos.map((item) => {
            return (
              <Grid item xs={12} md={3} key={item.id || item.title}>
                <Equipment
                  id={item.id}
                  key={item.imageData.alt}
                  imgData={item.imageData}
                  colorBorder={
                    isDesktop
                      ? { ...item.colorBorder, color: item.colorBorder.colorDesktop || item.colorBorder.color }
                      : item.colorBorder
                  }
                  title={item.title}
                  text={item.text}></Equipment>
              </Grid>
            );
          })}
        </Grid>
        <Grid container justifyContent={"center"}>
          <span
            onClick={handleDownloadBrochureClick}
            className={styles.downloadButton}>
            <DownloadForOfflineIcon
              sx={{ color: "#007960", fontSize: "50px", marginRight: "20px" }}
            />{" "}
            Descargar Brochure
          </span>
        </Grid>
        <Contact {...esData.contact}></Contact>
        <Footer MenuOptions={MenuOptions}></Footer>
      </main>
    </AppContextProvider >
  );
}
