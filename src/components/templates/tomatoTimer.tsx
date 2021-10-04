/* eslint-disable @next/next/no-img-element */
import React, {useCallback, Dispatch, SetStateAction} from "react";
import TomatoSlider from "../organisms/tomatoSlider";
import {
  styled,
} from "@material-ui/core/styles";


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
  countUp: () => void;
};


const TomatoTimer: React.VFC<Props> = ({
  isAutoStart,
  maxTime,
  countUp
}) => {
   return (
    <Container>
      <TomatoSlider
        isAutoStart={isAutoStart}
        maxTime={maxTime}
        countUp={countUp}
      />
    </Container>
  );
};


export default React.memo(TomatoTimer);
