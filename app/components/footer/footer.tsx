import { Box, Grid, Hidden, Typography } from '@mui/material'
import { Drawer, List, ListItem, ListItemText, Link } from '@mui/material';
import React from 'react'
import logoImg from "@/images/Logo.png";
import footerImage from "@/images/Boton_Foter.png";
import styles from "./footer.module.css";
import Image from "next/image";
import { MenuOption } from '../menu/menu';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function footer({ MenuOptions }: { MenuOptions: MenuOption[] }) {
    const socialLinks = [
        {
            text: "Facebook",
            href: "https://www.facebook.com/Augen.Tec/",
            icon: <FacebookIcon style={{ color: "#131414" }} />,
        },
        {
            text: "Linkedin",
            href: "https://www.linkedin.com/company/augen-tec/",
            icon: <LinkedInIcon style={{ color: "#131414" }} />,
        },
        {
            text: "Instagram",
            href: "https://www.instagram.com/augen_tec/",
            icon: <InstagramIcon style={{ color: "#131414" }} />,
        },
        {
            text: "YouTube",
            href: "https://www.youtube.com/@AugenTec",
            icon: <YouTubeIcon style={{ color: "#131414" }} />
        },
    ];

    const handleAugenIconClick = () => {
        window.open("http://augenopticos.com", "_blank");
    }

    return (
        <div>
            <Hidden mdUp> {/* mobil */}
                <Grid container className={styles.footerContainer}>
                    <Grid item xs={7} className={styles.footerImageContainer}>
                        <div className={styles.imagesContainer}>
                            <Image src={logoImg} alt="Augen-tec" className={styles.logo}></Image>
                            <Image onClick={handleAugenIconClick} src={footerImage} alt="Augen-tec" className={styles.footerLogo}></Image>
                        </div>
                    </Grid>
                    <Grid item xs={5} className={styles.footerMenuContainer}>
                        <List>
                            {MenuOptions.map(option => (
                                <a href={`#${option.key}`} key={option.key}>
                                    <ListItem button>
                                        <span className={styles.menuItem}>
                                            {option.value}
                                        </span>
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} className={styles.footerTextContainer}>
                        <div className={styles.textContainer}>
                            © 2023 AUGEN TEC
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden mdDown> {/* desktop */}
                <Grid container className={styles.footerContainer}>
                    <Grid item xs={3} className={styles.footerImageContainer}>
                        <div className={styles.imagesContainer}>
                            <Image src={logoImg} alt="Augen-tec" className={styles.logo}></Image>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={styles.footerMenuContainer}>
                        <List>
                            {MenuOptions.map(option => (
                                <a href={`#${option.key}`} key={option.key}>
                                    <ListItem button>
                                        <span className={styles.menuItem}>
                                            {option.value}
                                        </span>
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={3}>
                        <Box className={styles.footerMenuContainer}>
                            <Typography className={[styles.fontColor, styles.bold].join(" ")}>Siguenos en</Typography>
                            <ul className={styles.socialLinkElements}>
                                {socialLinks.map((socialLink, socialLinkIndex) => (
                                    <Box key={`socialLink-${socialLinkIndex}`} className={''}>
                                        <Link href={socialLink.href} className={styles.fontColor}>
                                            <div className={styles.fontColor}>
                                                <a className={styles.socialLinkElements}>
                                                    {socialLink.icon}
                                                </a>
                                            </div>
                                        </Link>
                                    </Box>
                                ))}
                            </ul>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={[styles.imagesContainerDesktop, styles.footerMenuContainer].join(" ")}>
                            <Image onClick={handleAugenIconClick} src={footerImage} alt="Augen-tec" className={styles.footerLogo}></Image>
                        </div>
                    </Grid>
                    <Grid item xs={12} className={styles.footerTextContainer}>
                        <div className={styles.textContainer}>
                            © 2023 AUGEN TEC
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
        </div>
    )
}
