/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Slider } from "@material-ui/core";
import { Timer } from "../../hooks/types";
import styles from "../../styles/components/tomatoSlider.module.scss";

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
  for (let step = 1; step < 6; step++) {
    arr.push({
      value: (-maxTime / 300) * step * 0.9999,
      label: roundDigit((maxTime / 300) * step, round).toString(),
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
  countUp: () => void;
  secondsLeft: number;
  status: string;
  timer: Timer;
};

const TomatoSlider: React.VFC<Props> = ({
  maxTime,
  countUp,
  secondsLeft,
  status,
  timer,
}) => {
  const [sliderVal, setSliderVal] = useState(1);

  useEffect(() => {
    if (secondsLeft < 0.5) {
      setSliderVal(0);
    } else {
      setSliderVal(-secondsLeft / 60);
    }
  }, [secondsLeft]);
  const onChangeSlider = (event: any, value: number | number[]) => {
    if (status !== "RUNNING" && "number" === typeof value) {
      if (value <= 0) {
        setSliderVal(value);
      }
    }
  };

  const onCommitedSlider = (event: any, value: number | number[]) => {
    if (value > 0) {
      return;
    }
    if (status === "STOPPED" && "number" === typeof value) {
      setSliderVal(value);
      if (-value >= (maxTime / 60) * 0.97) {
        setTimeout(() => {
          timer.start();
          countUp();
        }, 250);
      }
    } else if (status === "RUNNING" || status === "RESUME") {
      timer.pause();
    } else if (status === "PAUSED" && -value > (maxTime / 60) * 0.97) {
      timer.start();
    } else if (status === "PAUSED" && -value > 0.02) {
      timer.resume();
    } else if (status === "PAUSED" && -value < 0.02) {
      timer.stop();
      countUp();
    }
  };

  return (
    <Slider
      classes={{
        root: styles.root,
        thumb: styles.thumb,
        markLabel: styles.markLabel,
        markLabelActive: styles.markLabelActive,
        valueLabel:
          status !== "STOPPED" ? styles.valueLabelRun : styles.valueLabelStop,
        track: styles.track,
        rail: styles.rail,
        mark: styles.mark,
        markActive: styles.markActive,
      }}
      value={sliderVal}
      defaultValue={0}
      aria-labelledby="discrete-slider-always"
      min={-maxTime / 60}
      max={maxTime / 60 / 9} //トマトのhover判定を長めに取るために余分に長くする
      marks={createSliderMarks(maxTime, 3, status)}
      step={maxTime / 60 / 5}
      valueLabelDisplay="on"
      onChange={onChangeSlider}
      onChangeCommitted={onCommitedSlider}
    />
  );
};

export default React.memo(TomatoSlider);
