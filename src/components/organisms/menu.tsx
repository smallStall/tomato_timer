import React from "react";
import ThemeIcon from "./themeIcon";
import SoundSlider from "../molecules/soundSlider";
import styles from "./menu.module.scss";

export default function Menu() {
  return (
    <div className={styles.iconBar}>
      <SoundSlider />
      <ThemeIcon />
    </div>
  );
}
