/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext } from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import { useIntervalTimer } from "../../hooks/useIntervalTimer";
import { VolumeContext } from "../../pages/theme";
import { CountContext } from "../../pages/theme";
import Head from "next/head";
import Digit from "../molecules/digit";
import styles from "./timer.module.scss";
import { ToastContainer, Zoom } from "react-toastify";
import TimerButtons from "../organisms/timerButtons";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyMe,
  makeNotifyMessage,
  returnActivity,
  toastTomato,
} from "../../libs/notify";

const PROD_WORK_TIME = 25 * 60 + 2;
const PROD_REST_TIME = 5 * 60;
const PROD_DELAY_TIME = 2;
const PROD_SOUND_PATH = "zihou1.mp3";

const TEST_WORK_TIME = 5;
const TEST_REST_TIME = 3;
const TEST_DELAY_TIME = 1;
const TEST_SOUND_PATH = "test1.mp3";

const INTERVAL = 1;

const Timer: React.VFC = () => {
  const { volume } = useContext(VolumeContext);
  const { count : contextCount, setCount } = useContext(CountContext);
  const workTime = process.env.isProd ? PROD_WORK_TIME : TEST_WORK_TIME;
  const restTime = process.env.isProd ? PROD_REST_TIME : TEST_REST_TIME;
  const delayTime = process.env.isProd ? PROD_DELAY_TIME : TEST_DELAY_TIME;
  const soundPath = process.env.isProd ? PROD_SOUND_PATH : TEST_SOUND_PATH;

  const { timer, displayTime, activity, count, status, isRunning } =
    useIntervalTimer(
      workTime,
      restTime,
      INTERVAL,
      volume,
      delayTime,
      soundPath
    );

  useEffect(() => {
    const counterStop = ((count + 1) % 100).toString();
    setCount(counterStop + (activity === "Work" || activity === "None" ? "コ目" : "コ　"));
  }, [activity, count, setCount]);
  useEffect(() => {
    if (activity === "NextRest" || activity === "NextWork") {
      notifyMe(makeNotifyMessage(count, activity));
    }
  }, [count, activity]);

  useEffect(() => {
    toastTomato();
  }, []);

  //TODOactivityが切り替わるタイミングでサウンドの調整

  return (
    <>
      <Head>
        <title>{returnActivity(status, contextCount, activity, displayTime)}</title>
      </Head>
      <ToastContainer
        className={styles.toast}
        autoClose={9000}
        hideProgressBar={true}
        transition={Zoom}
      />
      <div className={styles.container}>
        <TimerButtons timer={timer} isRunning={isRunning} status={status} />
        <Digit seconds={displayTime} />
        <TomatoSlider
          maxTime={
            activity === "Work" || activity === "None" ? workTime : restTime
          }
          secondsLeft={displayTime}
          status={status}
          timer={timer}
          isRunning={isRunning}
          key={activity + "-slider"}
        />
      </div>
    </>
  );
};

export default Timer;
