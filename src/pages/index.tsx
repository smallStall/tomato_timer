import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "@material-ui/core";
import TomatoTimer from "../components/templates/tomatoTimer";
import PomodoroSelect from "../components/organisms/selectCount";
import Memo from "../components/organisms/memo";
import notifyMe from "../components/organisms/notify";
import CreditFooter from "../components/organisms/creditFooter";

function isAuto(count: number, oneSet: number): boolean {
  if (count <= 0) {
    return false;
  } else{
    return Math.floor(count / 4) < oneSet;
  }
}
const returnActivity = (count: number) => {
  if (count % 4 === 1) {
    return "活動中";
  } else if (count % 4 === 3) {
    return "休憩中";
  } else {
    return "ポモドーロタイマー";
  }
};

const returnFavicon = (count: number) => {
  if (count % 4 === 1) {
    return "-work";
  } else if (count % 4 === 3) {
    return "-rest";
  } else {
    return "";
  }
};

function makeNotifyMessage(count: number, oneSet: number) {
  let message;
  const pomodoroCount = Math.floor(count / 4);
  if (oneSet === 1) {
    message =
      pomodoroCount === count ? "お休みに移ります。" : "お休みが終わりました。";
  } else if (pomodoroCount !== oneSet) {
    message =
      pomodoroCount !== 0
        ? oneSet.toString() +
          "回中" +
          pomodoroCount.toString() +
          "回ポモドーロが終わりました。お休みに移ります。"
        : "お休みが終わりました。作業に取り掛かりましょう。";
  } else {
    message =
      oneSet.toString() + "回ポモドーロを達成しました。お疲れ様でした。";
  }
  return message;
}

const Home: NextPage = () => {
  const [maxWorkTime, setMaxWorkTime] = useState(300) // * 60); // * 60);
  const [maxRestTime, setMaxRestTime] = useState(300) // * 60); // * 60);
  const [count, setCount] = useState(0);
  const isFirstRender = useRef(false);
  const [pushMemo, setPushMemo] = useState("");
  const [oneSet, setOneSet] = useState(1);
  useEffect(() => {
    isFirstRender.current = true;
  }, []);
  useEffect(() => {
    setCount(0);
  }, [oneSet]);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      notifyMe(makeNotifyMessage(count, oneSet));
      if (Math.floor(count / 4) === oneSet) {
        isFirstRender.current = true;
        setCount(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, oneSet, pushMemo]);
  const countUp = useCallback(
    () =>
      setCount((prev: number) => {
        console.log(prev + 1);
        return prev + 1;
      }),
    []
  );

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={"/favicons/favicon-32x32" + returnFavicon(count) + ".png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={"/favicons/favicon-16x16" + returnFavicon(count) + ".png"}
        />
        <title>{returnActivity(count)}</title>
      </Head>
      <Container maxWidth="md">
        <PomodoroSelect defaultMenuItem={oneSet} setOneSet={setOneSet} />
        <TomatoTimer
          key={Math.floor(count / 2).toString()}
          isAutoStart={isAuto(count, oneSet)}
          maxTime={Math.floor(count / 2) % 2 ? maxWorkTime : maxRestTime}
          countUp={countUp}
        />
        <div style={{ marginRight: "25px", textAlign: "right" }}>
          <Memo />
        </div>
      </Container>
      <CreditFooter />
    </>
  );
};

export default Home;
