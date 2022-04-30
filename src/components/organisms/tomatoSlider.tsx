/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { Timer, Status } from "../../types/intervalTimer";
import styles from "./tomatoSlider.module.scss";
import MsgToast from "components/molecules/msgToast";

const SLIDER_MARK_NUM = 5;

function roundDigit(num: number, digit: number) {
  if (digit >= 0) {
    const ten = 10 ** (digit - 1);
    return Math.round(num * ten) / ten;
  } else {
    throw "An argument of roundDigit is not correct";
  }
}

function createSliderMarks(maxTime: number, status: Status) {
  type SliderLabel = { value: number; label: string };
  let arr: SliderLabel[];
  arr = [];
  const oneMarkMinutes = maxTime / SLIDER_MARK_NUM / 60;
  const round  = oneMarkMinutes < 1 ? 3 : 1
  for (let step = 1; step <= SLIDER_MARK_NUM; step++) {
    arr.push({
      value: -oneMarkMinutes * step * 0.9999,
      label: roundDigit(oneMarkMinutes * step, round).toString(),
    });
  }
  arr.push({
    value: 0,
    label: status === 'STOPPED' ? "👈" : "👍",
  });
  return arr;
}

type Props = {
  maxTime: number;
  secondsLeft: number;
  status: Status;
  timer: Timer;
  isRunning: boolean;
};

const TomatoSlider: React.VFC<Props> = ({
  maxTime,
  secondsLeft,
  status,
  timer,
  isRunning,
}) => {
  const [sliderVal, setSliderVal] = useState(-secondsLeft / 60);
  const [isDisplayMessage, setDisplayMessage] = useState(false);
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    setSliderVal(-secondsLeft / 60);
    const tomato = Math.round(secondsLeft) % 2 === 0 ? "running1" : "running2";
    document.documentElement.setAttribute("animation", tomato);
  }, [secondsLeft, isRunning]);

  const onChangeSlider = (_event: any, value: number | number[]) => {
    if (status === 'STOPPED' && typeof value === "number") {
      if(value <= 0){
        setSliderVal(value);
      }
    }
  };

  const onCommitedSlider = (_event: any, value: number | number[]) => {
    if (typeof value == "number") {
      setDisplayMessage(true);
    }
  };

  return (
    <>
    <Slider
      classes={{
        root: styles.root,
        thumb: styles.thumb,
        markLabel: styles.markLabel,
        markLabelActive: styles.markLabelActive,
        track: styles.track,
        rail: styles.rail,
        mark: styles.mark,
        markActive: styles.markActive,
        valueLabel: styles.valueLabel,
      }}
      value={sliderVal}
      aria-labelledby="discrete-slider-always"
      min={-maxTime / 60}
      max={maxTime / 60 / 9} //トマトのhover判定を長めに取るために余分に長くする
      marks={createSliderMarks(maxTime, status)}
      step={0.01}
      valueLabelDisplay="off"
      onChange={onChangeSlider}
      onChangeCommitted={onCommitedSlider}
    />
    <MsgToast
      message={"トマトが移動しました。"}
      open={isDisplayMessage}
      buttonNum={0}
      handleClose={() => {setDisplayMessage(false)}}
      duration={2500}
     />
     </>
  );
};

export default React.memo(TomatoSlider);
