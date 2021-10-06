/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { Slider } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Timer } from "../../hooks/types";

const upThumbPath = "/27_tomato_up.png";
const downThumbPath = "/27_tomato_down.png";
const reverseThumbPath = "/27_tomato_rev.png";

interface StylesProps {
  minutes: number;
  addMinutes: number;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
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
    marginLeft: "10vw",
    marginBottom: 0,
  },
  thumb: {
    color: theme.palette.warning.main,
    pointerEvents: "none",
    width: "40px",
    height: "40px",
    transition: "unset",
    marginTop: -30,
    marginLeft: -15,
    boxShadow: "0 0 0 0",
    "& .tomato": {
      marginTop: -5,
      marginLeft: 0,
      marginRight: 1,
    },
  },
  thumbFocusVisible: {
    boxShadow: "0 0 0 0!important",
  },
  label: {
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
    "&::after": {
      position: "absolute",
      right: 0,
      backgroundColor: theme.palette.background.default,
      content: '""',
      width: ({ minutes, addMinutes }) =>
        ((addMinutes / (minutes + addMinutes)) * 100).toString() + "%",
      height: "7px",
    },
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
      marginTop: "25px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "40px",
    },
  },
  markLabelActive: {},
}));

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
  for (let step = 1; step < 5; step++) {
    arr.push({
      value: (-maxTime / 300) * step,
      label: roundDigit((maxTime / 300) * step, round).toString(),
    });
  }
  arr.push({
    value: -maxTime / 60,
    label: "🍅",
  });
  arr.push({
    value: 0,
    label: status === "STOPPED" ? "👈" : "👍",
  });
  return arr;
}

type Angle = "Up" | "Down" | "Reverse";

const upThumb = <img className="tomato" alt="tomato" src={upThumbPath}></img>;
const downThumb = (
  <img className="tomato" alt="tomato" src={downThumbPath}></img>
);
const reverseThumb = (
  <img className="tomato" alt="tomato" src={reverseThumbPath}></img>
);

const makeThumbTomato = (angle: Angle, props: any) => {
  return (
    <span {...props}>
      {angle === "Up" ? upThumb : angle === "Down" ? downThumb : reverseThumb}
    </span>
  );
};

const makeUpTomato = (props: any) => makeThumbTomato("Up", props);
const makeDownTomato = (props: any) => makeThumbTomato("Down", props);
const makeReverseTomato = (props: any) => makeThumbTomato("Reverse", props);

type Props = {
  isAutoStart: boolean;
  maxTime: number;
  countUp: () => void;
  secondsLeft: number;
  status: string;
  timer: Timer;
};

const TomatoSlider: React.VFC<Props> = ({
  isAutoStart,
  maxTime,
  countUp,
  secondsLeft,
  status,
  timer,
}) => {
  const props = { minutes: maxTime / 60, addMinutes: maxTime / 60 / 9 };
  const classes = useStyles(props);

  const [sliderVal, setSliderVal] = useState(1);
  useEffect(() => {
    if (Math.ceil(secondsLeft) % 3 === 0) {
      setSliderVal(-secondsLeft / 60), 3000;
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
        timer.start();
        countUp();
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

  const makeThumbTomato = (props: any) => {
    return status === "RUNNING" || status === "RESUME"
      ? Math.round(secondsLeft) % 2 === 0
        ? makeUpTomato(props)
        : makeDownTomato(props)
      : makeReverseTomato(props);
  };

  return (
    <>
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
        min={-maxTime / 60}
        max={maxTime / 60 / 9} //トマトのhover判定を長めに取るために+3分多めに取る
        marks={createSliderMarks(maxTime, 3, status)}
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
