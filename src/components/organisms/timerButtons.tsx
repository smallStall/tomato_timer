import React, { useCallback, useState } from "react";
import { Timer, Status, StatusValues } from "../../types/intervalTimer";
import styles from "./timerButton.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import StopIcon from "@mui/icons-material/Stop";
import MsgBox from "../molecules/msgbox";

type Props = {
  isRunning: boolean;
  status: Status;
  timer: Timer;
};

const TimerButtons: React.VFC<Props> = ({ timer, isRunning, status }) => {
  const [isMsgBoxOpen, setMsgBoxOpen] = useState(false);
  const onClick = (status: Status) => {
    if (isRunning) {
      timer.pause();
    } else if (status === StatusValues.stopped) {
      timer.start();
    } else if (status === StatusValues.paused) {
      timer.resume();
    }
  };
  const onClickRestart = () => {
    setMsgBoxOpen(true);
  };

  const getIconRestart = useCallback((isRunning: boolean, status: Status) => {
    return isRunning || status === StatusValues.stopped ? null : (
      <IconButton aria-label="stop" onClick={onClickRestart}>
        <StopIcon className={styles.restartButton} />
      </IconButton>
    );
  }, []);

  const getIcon = useCallback((isRunning: boolean) => {
    return isRunning ? (
      <SvgIcon className={styles.pauseButton}>
        <rect x="8" y="6" width="2.5" height="12" />
        <rect x="13.5" y="6" width="2.5" height="12" />
      </SvgIcon>
    ) : (
      <PlayArrowIcon className={styles.playButton} />
    );
  }, []);

  const onClose = (isOK: boolean) => {
    setMsgBoxOpen(false);
    if (isOK) {
      timer.stop();
    }
  };
  return (
    <div className={styles.root}>
      <IconButton onClick={() => onClick(status)} className={styles.iconButton}>
        {getIcon(isRunning)}
      </IconButton>
      {getIconRestart(isRunning, status)}
      <MsgBox
        msg="タイマーをリセットしますか？"
        open={isMsgBoxOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default React.memo(TimerButtons);
