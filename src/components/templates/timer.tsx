/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import { useIntervalTimer } from "../../hooks/useIntervalTimer";
import { VolumeContext } from "../../pages/theme";
import { CountContext } from "../../pages/theme";
import Head from "next/head";
import Digit from "../molecules/digit";
import TimerButtons from "../organisms/timerButtons";
import { returnActivity, toastTomato, makeNotifyMessage } from "../../libs/notify";
import MsgToast from "components/molecules/msgToast";
import styles from "./timer.module.scss";

const PROD_WORK_TIME = 25 * 60 + 2;
const PROD_REST_TIME = 5 * 60;
const PROD_DELAY_TIME = 2;
const TEST_WORK_TIME = 5;
const TEST_REST_TIME = 3;
const TEST_DELAY_TIME = 1;

const INTERVAL = 1;

const Timer: React.VFC = () => {
  const { volume } = useContext(VolumeContext);
  const { count: contextCount, setCount } = useContext(CountContext);
  const [barOpen, setBarOpen] = useState(false);  
  const workTime = process.env.isProd ? PROD_WORK_TIME : TEST_WORK_TIME;
  const restTime = process.env.isProd ? PROD_REST_TIME : TEST_REST_TIME;
  const delayTime = process.env.isProd ? PROD_DELAY_TIME : TEST_DELAY_TIME;

  const { timer, displayTime, activity, count, status, isRunning } =
    useIntervalTimer(
      workTime,
      restTime,
      INTERVAL,
      volume,
      delayTime,
    );
  const [minutes, setMinutes] = useState(-1);
  useEffect(() => {
    const min = Math.floor(displayTime / 60)
    if(min != minutes){
      setMinutes(min);
    }
  }, [displayTime, minutes])


  useEffect(() => {
    const counterStop = ((count + 1) % 100).toString();
    setCount(
      counterStop +
        (activity === "Work" || activity === "None" ? "コ目" : "コ　")
    );
  }, [activity, count, setCount]);
  useEffect(() => {
    if (activity === "NextRest" || activity === "NextWork") {
      setBarOpen(true);
    }
  }, [activity]);

  useEffect(() => {
    toastTomato();
  }, []);

  return (
    <>
      <Head>
        <title>
          {returnActivity(status, contextCount, activity, minutes)}
        </title>
      </Head>

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
        <MsgToast
          message={makeNotifyMessage(count, activity)}
          open={barOpen}
          handleClose={(_isOk) => setBarOpen(false)}
        />
      </div>
    </>
  );
};

export default Timer;
