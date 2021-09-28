/* eslint-disable @next/next/no-img-element */
import React, {useCallback} from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import {
  styled,
} from "@material-ui/core/styles";
/*
import { Howl } from 'howler';
import Timer from './timer.mp3';
*/


const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

type Props = {
  key: string;
  isAutoStart: boolean;
  maxTime: number;
  count: number;
  countUp: () => void;
};


const TomatoTimer: React.VFC<Props> = ({
  isAutoStart,
  maxTime,
  count,
  countUp,
}) => {
   return (
    <Container>
      <TomatoSlider
        key={count.toString()}
        isAutoStart={isAutoStart}
        maxTime={maxTime}
        count={count}
        countUp={countUp}
      />
    </Container>
  );
};


export default React.memo(TomatoTimer);
