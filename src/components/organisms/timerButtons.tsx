import React, { useEffect, useState } from "react";
import { Timer, Status, StatusValues } from "../../types/intervalTimer";
import styles from "./timerButtons.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { useSound } from "../../hooks/useSound";

type Props = {
  isRunning: boolean;
  status: Status;
  timer: Timer;
};

const TimerButtons: React.VFC<Props> = ({ timer, isRunning, status }) => {
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
  const onClick = (status: Status) => {
    if (isRunning) {
      timer.pause();
    } else if (status === StatusValues.stopped) {
      timer.start();
    } else if (status === StatusValues.paused) {
      timer.resume();
    }
  };

  return (
    <div className={styles.root} onClick={() => onClick(status)}>
      <IconButton>{getIcon(isRunning)}</IconButton>
    </div>
  );
};

export default TimerButtons;
