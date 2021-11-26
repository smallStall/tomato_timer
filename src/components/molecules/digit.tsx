import React from "react";
import { Typography } from "@mui/material";
import styles from "./digit.module.scss";

type Props = {
  seconds: number;
};

const Digit: React.VFC<Props> = ({ seconds }) => {
  const min = seconds > 0 ? Math.floor(seconds / 60 + 0.01) : 0;
  const sec = seconds > 0 ? Math.floor(seconds - min * 60) : 0;
  const style = {
    "--seconds": sec,
    "--minutes": min,
    "--iteration": seconds > 0 ? Math.ceil(seconds / 60) : 0,
  } as React.CSSProperties;
  return (
    <>
      <Typography align={"center"} className={styles.root} style={style}>
        {min + ":" + (sec < 10 ? "0" : "") + sec}
      </Typography>
    </>
  );
};

export default React.memo(Digit);
