import React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../../styles/components/title.module.scss";

export default function Title() {
  return (
    <section className={styles.titleBar}>
      <Typography variant="h5" className={styles.title}>
        Pomodoro Timer
      </Typography>
    </section>
  );
}
