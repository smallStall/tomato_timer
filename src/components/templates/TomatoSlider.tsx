/* eslint-disable @next/next/no-img-element */
import React, {
  Dispatch,
  useState,
  useEffect,
  SetStateAction,
  useRef,
} from "react";
import { Slider } from "@material-ui/core";
import Display from "../organisms/display";
import {
  makeStyles,
  styled,
} from "@material-ui/core/styles";
import Image from 'next/image'
/*
import { Howl } from 'howler';
import Timer from './timer.mp3';
*/


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
      value: -maxTime / 5,
      label: roundDigit((maxTime / 5) * 1, round).toString(),
    },
    {
      value: (-maxTime / 5) * 2,
      label: roundDigit((maxTime / 5) * 2, round).toString(),
    },
    {
      value: (-maxTime / 5) * 3,
      label: roundDigit((maxTime / 5) * 3, round).toString(),
    },
    {
      value: (-maxTime / 5) * 4,
      label: roundDigit((maxTime / 5) * 4, round).toString(),
    },
  ];
}

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

function UpThumbComponent(props: any) {
  return (
    <span {...props}>
      <img className="tomato" src="/pomodoroUp.svg" alt="tomato"/>
    </span>
  );
}
function DownThumbComponent(props: any) {
  return (
    <span {...props}>
      <img className="tomato" src="/pomodoroDown.svg" alt="tomato"/>
    </span>
  );
}
function UpReverseThumbComponent(props: any) {
  return (
    <span {...props}>
      <img className="tomato" src="/pomodoroUpReverse.svg" alt="tomato"/>
    </span>
  );
}

type clockStatus = "STOPPED" | "RUNNING" | "PAUSED" | "RESUME";

type Props = {
  key: string;
  isAutoStart: boolean;
  maxTime: number;
  count: number;
  interval: number;
  setCount: Dispatch<SetStateAction<number>>;
};


const usePauseTime = (
  status: clockStatus,
  minutesLeft: number,
  endTime: Date,
) => {
  useEffect(() => {
    if (status === "RESUME") {
      const now = new Date();
      endTime.setTime(now.getTime() + minutesLeft * 1000 * 60);
    }
  }, [endTime, minutesLeft, status]);
};

const useIntervalTimeLeft = (
  endTime: Date,
  interval: number,
  status: clockStatus,
  minutesLeft: number,
  setMinutesLeft: React.Dispatch<React.SetStateAction<number>>,
  setSliderVal: React.Dispatch<React.SetStateAction<number>>,
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "RUNNING" || status === "RESUME") {
        const now = new Date();
        const minutes = (endTime.getTime() - now.getTime()) / 60000;
        if (minutes > 0) {
          setMinutesLeft(minutes);
          setSliderVal(-minutes);
        } else {
          setMinutesLeft(0);
          setSliderVal(0);
          setCount((prev) => prev + 1);
        }
      }
    }, interval);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutesLeft, status]);
};


const TomatoSlider: React.VFC<Props> = ({
  isAutoStart,
  maxTime,
  count,
  setCount,
}) => {
  const classes = useStyles();
  const [sliderVal, setSliderVal] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const endTime = useRef(new Date());
  const [status, setStatus] = useState<clockStatus>("STOPPED");
  useIntervalTimeLeft(
    endTime.current,
    990,
    status,
    minutesLeft,
    setMinutesLeft,
    setSliderVal,
    setCount
  );
  usePauseTime(status, minutesLeft, endTime.current);
  const start = () => {
    setStatus("RUNNING");
    const now = new Date();
    now.setMinutes(now.getMinutes() + Math.floor(maxTime));
    now.setSeconds(now.getSeconds() + (maxTime - Math.floor(maxTime)) * 60);
    endTime.current =now;
    setMinutesLeft(maxTime);
  };
  useEffect(() => {
    if (isAutoStart) {
      start();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pause = () => setStatus("PAUSED");
  const resume = () => setStatus("RESUME");
  const stop = () => {
    setStatus("STOPPED");
    setCount((prev) => prev + 1);
  };
  const reset = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + maxTime);
    endTime.current = now;
    setStatus("RUNNING");
  };

  const onChangeSlider = (event: any, value: number | number[]) => {
    if (status !== "RUNNING" && "number" === typeof value) {
      setSliderVal(value);
    }
  };

  const onCommitedSlider = (event: any, value: number | number[]) => {
    if (status === "STOPPED" && "number" === typeof value) {
      setSliderVal(value);
      if (-value >= maxTime * 0.98) {
        start();
      }
    } else if (status === "RUNNING" || status === "RESUME") {
      pause();
    } else if (status === "PAUSED" && -value > maxTime * 0.98) {
      start();
    } else if (status === "PAUSED" && -value > 0.02) {
      resume();
    } else if (status === "PAUSED" && -value < 0.02 && count % 2 !== 0) {
      stop();
    }
  };

  return (
    <Container>
      <div>
        <Display
          minutesLeft={minutesLeft}
         />
      </div>
      <Slider
        classes={{root: classes.slider, thumb: classes.thumb, track: classes.track, rail: classes.rail, mark: classes.mark, markLabel: classes.markLabel, markActive: classes.markLabel}}
        value={sliderVal}
        defaultValue={0}
        aria-labelledby="discrete-slider-always"
        step={-maxTime / 10}
        min={-maxTime}
        max={0}
        marks={CreateSliderMarks(maxTime, 3)}
        valueLabelDisplay="on"
        track="inverted"
        ThumbComponent={
          status === "RUNNING" || status === "RESUME"
            ? Math.round(minutesLeft * 60) % 2 === 0
              ? UpThumbComponent
              : DownThumbComponent
            : UpReverseThumbComponent
        }
        onChange={onChangeSlider}
        onChangeCommitted={onCommitedSlider}
      />
    </Container>
  );
};

export default TomatoSlider;
