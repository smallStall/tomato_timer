import React, { useCallback, useState, useEffect } from "react";
import { Timer, Status, StatusValues } from "../../types/intervalTimer";
import styles from "./timerButton.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MsgToast from "components/molecules/msgToast";

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
  const onClickRestart = useCallback(() => {
    timer.restart();
    setMsgBoxOpen(true);
  }, [timer]);

  const getIconRestart = useCallback((isRunning: boolean, status: Status) => {
    return isRunning || status === StatusValues.stopped ? null : (
      <IconButton aria-label="stop" onClick={onClickRestart}>
        <RestartAltIcon className={styles.restartButton} />
      </IconButton>
    );
  }, [onClickRestart]);

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
      timer.restore();
    }
  };

  
  return (
    <div className={styles.root}>
      <IconButton onClick={() => onClick(status)} className={styles.iconButton}>
        {getIcon(isRunning)}
      </IconButton>
      {getIconRestart(isRunning, status)}
      <MsgToast
        message="間違えてリセットしていた場合は、こちらから復元できます。"
        open={isMsgBoxOpen}
        handleClose={onClose}
        buttonNum={1}
        yesLabel="復元する"
        vertical="bottom"
        horizontal="right"
        duration={11000}
      />
    </div>
  );
};

export default React.memo(TimerButtons);
