import React from "react";
import { Typography } from "@mui/material";
import styles from "./digit.module.scss";
import { minusToZero } from "../../libs/accesories";

type Props = {
  seconds: number;
};

const Digit: React.VFC<Props> = ({ seconds }) => {
  const min = seconds > 0 ? Math.floor(seconds / 60) : 0;
  const sec = seconds > 0 ? Math.floor(seconds - min * 60) : 0;
  const style = {} as React.CSSProperties;
  return (
    <>
      <div className={styles.root}>
        <span>{min}</span>
        <span className={styles.colon}>:</span>
        <span>{(sec < 10 ? "0" : "") + minusToZero(sec)}</span>
      </div>
    </>
  );
};

export default React.memo(Digit);
