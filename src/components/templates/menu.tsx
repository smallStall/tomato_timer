import React, { useEffect, useState } from "react";
import ThemeIcon from "../organisms/themeIcon";
import SoundIcon from "../molecules/soundIcon";
import HistoryIcon from "components/organisms/historyIcon";
import styles from "./menu.module.scss";
import Counter from "../organisms/counter";

export default function Menu() {
  return (
    <div className={styles.iconBar}>
      <Counter />
      <SoundIcon label={"確認"} />
      <HistoryIcon label={"履歴"} />
      <ThemeIcon label={"テーマ"} />
    </div>
  );
}

//<NotificationIcon label={"通知"}/>　作ったのはいいけど特にいらないかも
