/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useCallback, useState } from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import { useIntervalTimer } from "../../hooks/useIntervalTimer";
import { VolumeContext } from "../../pages/theme";
import Head from "next/head";
import Digit from "../molecules/digit";
import styles from "./timer.module.scss";
import { ToastContainer, Zoom } from "react-toastify";
import { useWindowFocused } from "../../hooks/useWindowFocused";
import TimerButtons from  "../organisms/timerButtons";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyMe,
  makeNotifyMessage,
  returnActivity,
  returnFavicon,
  toastTomato,
} from "../../accessories/notify";

type Props = {
  workTime: number;
  restTime: number;
  maxCount: number;
};

const TIMER_DELAY_TIME = 3;

const Timer: React.VFC<Props> = ({ workTime, restTime, maxCount }) => {
  const { volume } = useContext(VolumeContext);
  const INTERVAL = 1;
  const { timer, displayTime, state, isRunning } = useIntervalTimer(
    workTime,
    restTime,
    INTERVAL,
    volume,
    maxCount,
    TIMER_DELAY_TIME,
    "zihou1.mp3"
  );

  const [digitalTime, setDigitalTime] = useState(workTime);
  useEffect(() => {
    if (state.activity === "NextRest" || state.activity === "NextWork") {
      notifyMe(makeNotifyMessage(state.count, maxCount, state.activity));
      setDigitalTime(0);
    } else if (state.activity === "Rest" || state.activity === "Work") {
      setDigitalTime(displayTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count, maxCount, state.activity]);

  useEffect(() => {
    setDigitalTime(displayTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useWindowFocused().isFocused, state.status]);

  useEffect(() => {
    toastTomato();
  }, []);
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={
            "/favicons/favicon-32x32" + returnFavicon(state.activity) + ".png"
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={
            "/favicons/favicon-16x16" + returnFavicon(state.activity) + ".png"
          }
        />
        <title>
          {returnActivity(state.activity, state.count, maxCount, state.status)}
        </title>
      </Head>
      <ToastContainer
        className={styles.toast}
        autoClose={6000}
        hideProgressBar={true}
        position={"bottom-right"}
        transition={Zoom}
      />
      <div className={styles.container}>
        <Digit
          seconds={digitalTime}
          key={state.activity + digitalTime.toString()}
        />
        <TimerButtons
          timer={timer}
          isRunning={isRunning}
         />
        <TomatoSlider
          maxTime={
            state.activity === "Work" || state.activity === "None"
              ? workTime
              : restTime
          }
          secondsLeft={displayTime}
          status={state.status}
          timer={timer}
          isRunning={isRunning}
          key={state.activity + "-slider"}
        />
      </div>
    </>
  );
};

export default Timer;
