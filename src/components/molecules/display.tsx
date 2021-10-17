import React from "react";
import { Typography } from "@material-ui/core";
import styles from "../../styles/components/display.module.scss";

const toClockString = (secondsLeft: number) => {
  if (secondsLeft <= 0) {
    return "0:00";
  }
  const minutes = Math.floor(secondsLeft / 60 + 0.001);
  const seconds = Math.round(secondsLeft - minutes * 60);
  return `${minutes}:${("00" + seconds).slice(-2)}`;
};


const Display: React.VFC<{secondsLeft: number}> = ({secondsLeft}) => {
  return (
    <>
      <Typography align={"center"} className={styles.root}>
        {toClockString(secondsLeft)}
      </Typography>
    </>
  );
};

export default Display;
