/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { Timer } from "../../types/intervalTimer";
import styles from "./tomatoSlider.module.scss";
import { delay } from "../../accessories/functions"

const SLIDER_MARK_NUM = 5


function roundDigit(num: number, digit: number) {
  if (digit >= 0) {
    const ten = 10 ** (digit - 1);
    return Math.round(num * ten) / ten;
  } else {
    throw "An argument of roundDigit is not correct";
  }
}

function createSliderMarks(maxTime: number, round: number, status: string) {
  type SliderLabel = { value: number; label: string };
  let arr: SliderLabel[];
  arr = [];
  const oneMarkMinutes = maxTime / SLIDER_MARK_NUM / 60;
  for (let step = 1; step <= SLIDER_MARK_NUM; step++) {
    arr.push({
      value: (-oneMarkMinutes) * step * 0.9999,
      label: roundDigit(oneMarkMinutes * step, round).toString(),
    });
  }
  arr.push({
    value: 0,
    label: status === "STOPPED" ? "👈" : "👍",
  });
  return arr;
}

type Props = {
  maxTime: number;
  secondsLeft: number;
  status: string;
  timer: Timer;
  isRunning: boolean
};

const TomatoSlider: React.VFC<Props> = ({
  maxTime,
  secondsLeft,
  status,
  timer,
  isRunning,
}) => {
  const [sliderVal, setSliderVal] = useState(-secondsLeft / 60);
  const [pausedVal, setPausedVal] = useState(0);
  useEffect(() => {
    if(!isRunning){
      return;
    }
    if (secondsLeft < 0.5) {
      setSliderVal(0);
    } else {
      setSliderVal(-secondsLeft / 60);
      const tomato = Math.round(secondsLeft) % 2 === 0 ? "running1" : "running2";
      document.documentElement.setAttribute("animation", tomato);
    }
  }, [secondsLeft, isRunning]);
  const onChangeSlider = (event: any, value: number | number[]) => {
    if (status !== "RUNNING" && "number" === typeof value) {
      if (value <= 0) {
        setSliderVal(value);
      }
    }
  };


  const onCommitedSlider = (event: any, value: number | number[]) => {
    if (value > 0 || "number" !== typeof value) {
      return;
    }
    if (status === "STOPPED") {
      setSliderVal(-maxTime / 60);
      delay(timer.start, 250);

    } else if (status === "RUNNING" || status === "RESUME") {
      setPausedVal(value);
      timer.pause();
    } else if (status === "PAUSED") {
      timer.add((pausedVal - sliderVal) * 60);
      timer.resume();
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
      marks={createSliderMarks(maxTime, 3, status)}
      step={1}
      valueLabelDisplay="off"
      onChange={onChangeSlider}
      onChangeCommitted={onCommitedSlider}
    />
  );
};

export default React.memo(TomatoSlider);
