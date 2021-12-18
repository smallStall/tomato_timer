import React, { useEffect, useState } from "react";
import ThemeIcon from "../organisms/themeIcon";
import SoundIcon from "../molecules/soundIcon";
import styles from "./menu.module.scss";
import Counter from "../organisms/counter";

export default function Menu() {
  return (
    <div className={styles.iconBar}>
      <Counter />
      <ThemeIcon label={"テーマ"} />
      <SoundIcon label={"音の確認"} />
      
    </div>
  );
}

//<NotificationIcon label={"通知"}/>　作ったのはいいけど特にいらないかも