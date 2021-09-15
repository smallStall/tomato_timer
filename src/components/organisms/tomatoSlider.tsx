/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@material-ui/core";
import Display from "../molecules/display";
import { makeStyles } from "@material-ui/core/styles";
import { useCountdown } from "../../hooks/useCountdown";
import { ReactComponent as Icon } from "/pomodoroUp.svg";


const useStyles = makeStyles({
  root: {
    width: "60%",
    marginLeft: "5%",
    marginTop: "12%",
  },
  valueLabel: {
    fontSize: "2rem",
  },
  slider: {
    height: 2,
    padding: "30px 0",
    elevation: 0,
  },
  thumb: {
    marginTop: -25,
    marginLeft: -6,
    "& .tomato": {
      // display: inline-block !important;
      height: 55,
      width: 55,
      //backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  track: {
    height: 4,
  },
  rail: {
    height: 4,
    opacity: 0.1,
  },
  mark: {
    height: 15,
    width: 2,
    marginTop: -5,
    opacity: 0.1,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
  markLabel: {
    lineHeight: "3.5rem",
    fontSize: "1.2rem",
  },
});

function roundDigit(num: number, digit: number) {
  if (digit >= 0) {
    const ten = 10 ** (digit - 1);
    return Math.round(num * ten) / ten;
  } else {
    throw "An argument of roundDigit is not correct";
  }
}

function CreateSliderMarks(maxTime: number, round: number) {
  return [
    {
      value: -maxTime / 300,
      label: roundDigit((maxTime / 300) * 1, round).toString(),
    },
    {
      value: (-maxTime / 300) * 2,
      label: roundDigit((maxTime / 300) * 2, round).toString(),
    },
    {
      value: (-maxTime / 300) * 3,
      label: roundDigit((maxTime / 300) * 3, round).toString(),
    },
    {
      value: (-maxTime / 300) * 4,
      label: roundDigit((maxTime / 300) * 4, round).toString(),
    },
  ];
}

function UpThumbComponent(props: any) {
  return (
    <span {...props}>
      <Icon />
      
    </span>
  );
}
function DownThumbComponent(props: any) {
  return (
    <span {...props}>
      <img className="tomato" src="/pomodoroDown.svg" alt="tomato" />
    </span>
  );
}
function UpReverseThumbComponent(props: any) {
  return (
    <span {...props}>
      <img className="tomato" src="/pomodoroUpReverse.svg" alt="tomato" />
    </span>
  );
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
    if(status === 'FINISHED'){
      countUp();
    };
  }, [status, countUp]);
  useEffect(() => {
    setSliderVal(- secondsLeft / 60);
  }, [secondsLeft]);
  const onChangeSlider = (event: any, value: number | number[]) => {
    if (status !== "RUNNING" && "number" === typeof value) {
      setSliderVal(value);
    }
  };

  const onCommitedSlider = (event: any, value: number | number[]) => {
    if (status === "STOPPED" && "number" === typeof value) {
      setSliderVal(value);
      if (-value >= (maxTime / 60 * 0.98)) {
        timer.start();
      }
    } else if (status === "RUNNING" || status === "RESUME") {
      timer.pause();
    } else if (status === "PAUSED" && -value > (maxTime / 60 * 0.98)) {
      timer.start();
    } else if (status === "PAUSED" && -value > 0.02) {
      timer.resume();
    } else if (status === "PAUSED" && -value < 0.02 && count % 2 !== 0) {
      timer.stop();
    }
  };
  
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
        ThumbComponent={
          status === "RUNNING" || status === "RESUME"
            ? Math.round(secondsLeft) % 2 === 0
              ? UpThumbComponent
              : DownThumbComponent
            : UpReverseThumbComponent
        }
        onChange={onChangeSlider}
        onChangeCommitted={onCommitedSlider}
      />
    </>
  );
};

export default TomatoSlider;
