import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ThemeIcon from "./themeIcon";
import SoundSlider from '../molecules/soundSlider'
import styles from "../../styles/components/menu.module.scss";

export default function Menu() {
  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.app}>
        <Toolbar className={styles.toolBar}>
          <Typography variant="h5" className={styles.title}>
            Pomodoro Timer
          </Typography>
        </Toolbar>
        <div className={styles.iconBar}>
          <ThemeIcon />
          <SoundSlider />
        </div>
      </AppBar>
    </div>
  );
}
