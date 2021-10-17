/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useContext} from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import {
  styled,
} from "@material-ui/core/styles";
import { useCountdown } from "../../hooks/useCountdown";
import { VolumeContext } from "../../pages/theme";

import Display from "../molecules/display";
const SOUND_TIME = 2;


const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

type Props = {
  key: string;
  isAutoStart: boolean;
  workTime: number;
  restTime: number;
  countUp: () => void;
};


const TomatoTimer: React.VFC<Props> = ({
  isAutoStart,
  workTime,
  restTime,
  countUp
}) => {
  const { volume } = useContext(VolumeContext);
  const interval = 1000;

  const [timer, secondsLeft, status] = useCountdown(
    workTime + restTime,
    interval,
    0,
    volume
  );
  useEffect(() => {
    if (isAutoStart) {
      countUp();
      timer.start(), SOUND_TIME * 1000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (status === "FINISHED") {
      countUp();
    }
  }, [status, countUp]);

   return (
    <Container>
      <Display secondsLeft={secondsLeft} />
      <TomatoSlider
        workTime={workTime}
        restTime={restTime}
        countUp={countUp}
        secondsLeft={secondsLeft}
        status={status}
        timer={timer}
      />
    </Container>
  );
};


export default React.memo(TomatoTimer);
