import { Box, Grid, Hidden } from '@mui/material'
import React, { useEffect } from 'react'
import styles from './contact.module.css';

export interface ContactProps {
    id?: string,
    title: string,
    text: string,
    socials: {
        icon: any,
        url: string,
        text: string,
    }[]
}

export default function contact({ title, text, socials, id }: ContactProps) {

    const handleSocialNetworkLink = (url: string) => {
        window.open(url, "_blank");
    }

    return (
        <>
            <Hidden mdUp> {/* mobil */}
                <Grid container>
                    <Grid className={styles.container} id={id || title}>
                        <Grid item className={styles.titleContainer}>
                            <span> {title} </span>
                        </Grid>
                        <Grid item className={styles.textContainer}>
                            <span>{text}</span>
                        </Grid>
                        <Grid className={styles.container}>
                            {socials.map(item => (
                                <Grid item key={item.text} xs={12} className={styles.socialsIcons} onClick={() => handleSocialNetworkLink(item.url)}>
                                    <item.icon className={styles.icon}></item.icon><span> {item.text}</span>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden mdDown> {/* desktop */}
                <Grid container spacing={2} className={styles.containerDesktop}>
                    <Grid item xs={6} className={styles.container} id={id || title}>
                        <Grid item className={[styles.titleContainer, styles.titleDesktop, styles.titleContainerDesktop].join(" ")}>
                            <span> {title} </span>
                        </Grid>
                        <Grid item className={[styles.textContainer, styles.titleDesktop].join(" ")}>
                            <span>{text}</span>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} className={styles.container}>
                        {socials.map(item => (
                            <Box key={item.text} className={styles.containerI}>
                                <Grid item key={item.text} xs={12} className={styles.socialsIcons} onClick={() => handleSocialNetworkLink(item.url)}>
                                    <div className={styles.containerIcons}>
                                        <item.icon className={styles.icon}></item.icon><span> {item.text}</span>
                                    </div>
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Hidden>
        </>
    )
}
