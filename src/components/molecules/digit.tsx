import React from "react";
import styles from "./digit.module.scss";
import { minusToZero } from "../../libs/accesories";

type Props = {
  seconds: number;
};

const Digit: React.VFC<Props> = ({ seconds }) => {
  const min = seconds > 0 ? Math.floor(seconds / 60) : 0;
  const sec = seconds > 0 ? Math.floor(seconds - min * 60) : 0;
  return (
    <p className={styles.root}>
      {min}
      <span className={styles.colon}>:</span>
      {(sec < 10 ? "0" : "") + minusToZero(sec)}
    </p>
  );
};

export default React.memo(Digit);
