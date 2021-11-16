import React, { useEffect, useState } from "react";
import { Timer, Status } from "../../types/intervalTimer";
import styles from "./timerButtons.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

type Props = {
  isRunning: boolean;
  timer: Timer;
};

const TimerButtons: React.VFC<Props> = ({ isRunning, timer }) => {
  const getIcon = (isRunning: boolean) => {
    return isRunning ? (
      <SvgIcon className={styles.pauseButton}>
        <rect x="8" y="6" width="2.5" height="12" />
        <rect x="13.5" y="6" width="2.5" height="12" />
      </SvgIcon>
    ) : (
      <PlayArrowIcon className={styles.playButton} />
    );
  };

  return (
    <div
      className={styles.root}
      onClick={() => (isRunning ? timer.pause() : timer.start())}
    >
      <IconButton>{getIcon(isRunning)}</IconButton>
    </div>
  );
};

export default TimerButtons;
