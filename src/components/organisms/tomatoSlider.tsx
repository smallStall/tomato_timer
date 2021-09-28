/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import { Slider } from "@material-ui/core";
import Display from "../molecules/display";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useCountdown } from "../../hooks/useCountdown";
const thumbPath = "/27_tomato.svg";

const useStyles = makeStyles(theme =>
  ({
    root: {
      color: theme.palette.secondary.main,
    },
    valueLabel: {
      fontSize: "2rem",
    },
    slider: {
      width: "80%",
      height: 2,
      padding: "55px 0",
      marginLeft: '5.5vw',
      elevation: 0,
    },
    thumb: {
      color: theme.palette.warning.main,
      width: "40px",
      height: "40px",
      transition: "unset",
      marginTop: -30,
      marginLeft: -15,
      boxShadow: "0 0 0 0",
      "& .tomato": {
        height: 65,
        width: 59,
        marginTop: -5,
        marginLeft: 0,
        marginRight: 1,
      },
    },
    thumbFocusVisible: {
      boxShadow: "0 0 0 0!important",
    },
    label:{
      color: theme.palette.primary.main,
    },
    track: {
      height: 4,
    },
    active: {
      color: theme.palette.primary.light,
    },
    rail: {
      height: 4,
      opacity: 1.0,
      color: theme.palette.primary.light,
    },
    mark: {
      height: 15,
      width: 2,
      marginTop: -5,
      color: theme.palette.primary.light,
    },
    markActive: {},
    markLabel: {
      fontSize: "1.3em",
      opacity: 1.0,
      [theme.breakpoints.down("sm")]: {
        marginTop: '25px',
      },
      [theme.breakpoints.up("sm")]:{
        marginTop: '40px',
      }
      ,
    },
    markLabelActive: {},
  })
);


function roundDigit(num: number, digit: number) {
  if (digit >= 0) {
    const ten = 10 ** (digit - 1);
    return Math.round(num * ten) / ten;
  } else {
    throw "An argument of roundDigit is not correct";
  }
}

function createSliderMarks(maxTime: number, round: number) {
  type SliderLabel = { value: number; label: string };
  let arr: SliderLabel[];
  arr = [];
  for (let step = 1; step < 5; step++) {
    arr.push({
      value: (-maxTime / 300) * step,
      label: roundDigit((maxTime / 300) * step, round).toString(),
    });
  }
  return arr;
}

type Angle = "Up" | "Down" | "Reverse";
const makeThumbTomato = (angle: Angle, props: any) => {
  return (
    <span {...props}>
      <img
        className="tomato"
        src={thumbPath}
        alt="tomato"
        style={
          angle === "Up"
            ? { transform: `rotate(0deg)` }
            : angle === "Down"
            ? { transform: `rotate(340deg)` }
            : { transform: `scale(-1, 1)` }
        }
      />
    </span>
  );
};

const makeUpTomato = (props: any) => makeThumbTomato("Up", props);
const makeDownTomato = (props: any) => makeThumbTomato("Down", props);
const makeReverseTomato = (props: any) => makeThumbTomato("Reverse", props);

type Props = {
  key: string;
  isAutoStart: boolean;
  maxTime: number;
  count: number;
  countUp: () => void;
};


const TomatoSlider: React.VFC<Props> = ({
  isAutoStart,
  maxTime,
  count,
  countUp,
}) => {
  const interval = 1000;
  const [timer, secondsLeft, status] = useCountdown(maxTime, interval);
  const classes = useStyles();
  const [sliderVal, setSliderVal] = useState(0);
  useEffect(() => {
    if (isAutoStart) {
      timer.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (status === "FINISHED") {
      countUp();
    }
  }, [status, countUp]);
  useEffect(() => {
    setSliderVal(-secondsLeft / 60);
  }, [secondsLeft]);

  const onChangeSlider = (event: any, value: number | number[]) => {
    if (status !== "RUNNING" && "number" === typeof value) {
      setSliderVal(value);
    }
  }

  const onCommitedSlider = (event: any, value: number | number[]) => {
    if (status === "STOPPED" && "number" === typeof value) {
      setSliderVal(value);
      if (-value >= (maxTime / 60) * 0.98) {
        timer.start();
      }
    } else if (status === "RUNNING" || status === "RESUME") {
      timer.pause();
    } else if (status === "PAUSED" && -value > (maxTime / 60) * 0.98) {
      timer.start();
    } else if (status === "PAUSED" && -value > 0.02) {
      timer.resume();
    } else if (status === "PAUSED" && -value < 0.02 && count % 2 !== 0) {
      timer.stop();
    }
  }

  const makeThumbTomato =(props: any) => {
    return status === "RUNNING" || status === "RESUME"
      ? Math.round(secondsLeft) % 2 === 0
        ? makeUpTomato(props)
        : makeDownTomato(props)
      : makeReverseTomato(props);
  }

  return (
    <>
      <Display secondsLeft={secondsLeft} />
      <Slider
        classes={{
          root: classes.slider,
          thumb: classes.thumb,
          focusVisible: classes.thumbFocusVisible,
          valueLabel: classes.label,
         track: classes.track,
          rail: classes.rail,
          mark: classes.mark,
          markLabel: classes.markLabel,
          markActive: classes.markActive,
          active: classes.active,
        }}
        value={sliderVal}
        defaultValue={0}
        aria-labelledby="discrete-slider-always"
        step={-maxTime / 600}
        min={-maxTime / 60}
        max={0}
        marks={createSliderMarks(maxTime, 3)}
        valueLabelDisplay="on"
        track="inverted"
        ThumbComponent={makeThumbTomato}
        onChange={onChangeSlider}
        onChangeCommitted={onCommitedSlider}
      />
    </>
  );
};


export default React.memo(TomatoSlider);
