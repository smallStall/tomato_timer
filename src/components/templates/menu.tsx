import React from "react";
import ThemeIcon from "../organisms/themeIcon";
import SoundButton from "../molecules/soundButton";
import styles from "./menu.module.scss";
import Counter from "../organisms/counter";

export default function Menu() {
  return (
    <div className={styles.iconBar}>
      <Counter />
      <ThemeIcon label={"テーマ"}/>
      <SoundButton label={"通知音"}/>
    </div>
  );
}
