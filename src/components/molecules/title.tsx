import React from "react";
import Typography from "@mui/material/Typography";
import styles from "./title.module.scss";

type Props = {title: string}

const Title: React.VFC<Props> = ({title}) => {
  return (
    <section className={styles.titleBar}>
      <Typography variant="h4" className={styles.title}>
        {title}
      </Typography>
    </section>
  );
}

export default Title;