/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useRef, useState } from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import { styled } from "@material-ui/core/styles";
import { useCountdown } from "../../hooks/useCountdown";
import { VolumeContext } from "../../pages/theme";
import Head from "next/head";
import Display from "../molecules/display";

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

type Props = {
  isAutoStart: boolean;
  workTime: number;
  restTime: number;
  countUp: () => void;
};
const returnActivity = (activity: Activity) => {
  if (activity === "None") {
    return "ポモドーロタイマー";
  } else if (activity === "Work") {
    return "作業中";
  } else {
    return "休憩中";
  }
};

const returnFavicon = (activity: Activity) => {
  if (activity === "None") {
    return "";
  } else if (activity === "Work") {
    return "-work";
  } else {
    return "-rest";
  }
};

type Activity = "None" | "Work" | "Rest";

const TomatoTimer: React.VFC<Props> = ({
  isAutoStart,
  workTime,
  restTime,
  countUp,
}) => {
  const { volume } = useContext(VolumeContext);
  const INTERVAL = 2;
  const [timer, secondsLeft, status] = useCountdown(
    workTime + restTime,
    INTERVAL * 1000,
    volume
  );
  const [displayTime, setDisplayTime] = useState(workTime);
  const [sliderTime, setSliderTime] = useState(workTime);
  const [activity, setActivity] = useState<Activity>("None");
  useEffect(() => {
    if (isAutoStart) {
      timer.start();
      setActivity("Work");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const diff = INTERVAL * 0.7;

  useEffect(() => {
    if (
      (secondsLeft > 60 - diff && secondsLeft < 60 + diff) ||
      (secondsLeft > 600 - diff && secondsLeft < 60 + diff)
    ) {
      setDisplayTime(
        activity === "Work" ? secondsLeft - restTime : secondsLeft
      );
    }
    if (
      secondsLeft > restTime - diff &&
      secondsLeft < restTime + diff &&
      activity === "Work"
    ) {
      setActivity("Rest");
      setSliderTime(Math.round(secondsLeft));
      setDisplayTime(Math.round(secondsLeft));
    } else {
      setSliderTime(activity === "Work" ? secondsLeft - restTime : secondsLeft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  useEffect(() => {
    if (status === "FINISHED") {
      timer.stop();
      setTimeout(() => {
        countUp();
      }, 3000);
    } else if (status === "RUNNING") {
      setActivity("Work");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={"/favicons/favicon-32x32" + returnFavicon(activity) + ".png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={"/favicons/favicon-16x16" + returnFavicon(activity) + ".png"}
        />
        <title>{returnActivity(activity)}</title>
      </Head>
      <Container>
        <Display
          seconds={displayTime}
          key={activity + displayTime.toString()}
        />
        <TomatoSlider
          maxTime={
            activity === "Work" || activity === "None" ? workTime : restTime
          }
          countUp={countUp}
          secondsLeft={sliderTime}
          status={status}
          timer={timer}
          key={activity + "-slider"}
        />
      </Container>
    </>
  );
};

export default React.memo(TomatoTimer);
