import React from "react";
import Typography from "@mui/material/Typography";
import styles from "./title.module.scss";

export default function Title() {
  return (
    <section className={styles.titleBar}>
      <Typography variant="h4" className={styles.title}>
        ポモドーロ・テクニック タイマー
      </Typography>
    </section>
  );
}
