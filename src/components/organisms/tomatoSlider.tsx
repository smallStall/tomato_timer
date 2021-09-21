/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Slider, Icon } from "@material-ui/core";
import Display from "../molecules/display";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useCountdown } from "../../hooks/useCountdown";
const thumbPath = "/27_tomato.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "60%",
      color: theme.palette.primary.main,
    },
    valueLabel: {
      fontSize: "2rem",
    },
    slider: {
      height: 2,
      padding: "55px 0",
      elevation: 0,
    },
    thumb: {
      marginTop: -25,
      marginLeft: -6,
      "& .tomato": {
        height: 55,
        width: 55,
        marginLeft: 1,
        marginRight: 1,
      },
    },
    track: {
      height: 4,
    },
    rail: {
      height: 4,
      opacity: 1.0,
    },
    mark: {
      height: 15,
      width: 2,
      marginTop: -5,
      color: theme.palette.secondary.light,
    },
    markActive: {
    },
    markLabel: {
      fontSize: "1.3rem",
      opacity: 1.0,
    },
    markLabelActive: {
    }
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

function CreateSliderMarks(maxTime: number, round: number) {
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
  };

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
  };

  function makeThumTomato(props: any) {
    return (
      <span {...props}>
        <img
          className="tomato"
          src={thumbPath}
          alt="tomato"
          style={
            status === "RUNNING" || status === "RESUME"
              ? Math.round(secondsLeft) % 2 === 0
                ? { transform: `rotate(0deg)` }
                : { transform: `rotate(340deg)` }
              : { transform: `scale(-1, 1)` }
          }
        />
      </span>
    );
  }
  return (
    <>
      <Display secondsLeft={secondsLeft} />
      <Slider
        classes={{
          root: classes.slider,
          thumb: classes.thumb,
          track: classes.track,
          rail: classes.rail,
          mark: classes.mark,
          markLabel: classes.markLabel,
          markActive: classes.markLabel,
        }}
        value={sliderVal}
        defaultValue={0}
        aria-labelledby="discrete-slider-always"
        step={-maxTime / 600}
        min={-maxTime / 60}
        max={0}
        marks={CreateSliderMarks(maxTime, 3)}
        valueLabelDisplay="on"
        track="inverted"
        ThumbComponent={makeThumTomato}
        onChange={onChangeSlider}
        onChangeCommitted={onCommitedSlider}
      />
    </>
  );
};

export default TomatoSlider;
