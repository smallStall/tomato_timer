import React from "react";
import ThemeIcon from "../organisms/themeIcon";
import SoundIcon from "../molecules/soundIcon";
import styles from "./menu.module.scss";
import Counter from "../organisms/counter";
import NotificationIcon from "components/organisms/notificationIcon";
export default function Menu() {
  return (
    <div className={styles.iconBar}>
      <Counter />
      <ThemeIcon label={"テーマ"}/>
      <SoundIcon label={"音の確認"}/>
      <NotificationIcon label={"通知"} />
    </div>
  );
}
