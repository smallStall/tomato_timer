/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { Timer, Status } from "../../types/intervalTimer";
import styles from "./tomatoSlider.module.scss";
import { delay } from "../../libs/accesories";
import { StatusValues } from "../../types/intervalTimer";

const SLIDER_MARK_NUM = 5;

function roundDigit(num: number, digit: number) {
  if (digit >= 0) {
    const ten = 10 ** (digit - 1);
    return Math.round(num * ten) / ten;
  } else {
    throw "An argument of roundDigit is not correct";
  }
}

function createSliderMarks(maxTime: number, status: string) {
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
    label: status === StatusValues.stopped ? "👈" : "👍",
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
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    setSliderVal(-secondsLeft / 60);
    const tomato = Math.round(secondsLeft) % 2 === 0 ? "running1" : "running2";
    document.documentElement.setAttribute("animation", tomato);
  }, [secondsLeft, isRunning]);

  const onChangeSlider = (_event: any, value: number | number[]) => {
    if (status === StatusValues.stopped && typeof value === "number") {
      setSliderVal(value);
    }
  };

  const onCommitedSlider = (_event: any, value: number | number[]) => {
    if (value > 0 || typeof value !== "number") {
      return;
    }
    if (status === StatusValues.paused) {
      timer.resume();
    } else if (status === StatusValues.stopped) {
      delay(timer.start, 200);
    } else if (isRunning) {
      timer.pause();
    }
  };

  return (
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
  );
};

export default React.memo(TomatoSlider);
