import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Container from "@material-ui/core/Container";
import TomatoTimer from "../components/templates/tomatoTimer";
import PomodoroSelect from "../components/organisms/selectCount";
import Memo from "../components/organisms/memo";
import notifyMe from "../components/organisms/notify";
import Footer from "../components/organisms/footer";

function isAuto(count: number, oneSet: number): boolean {
  if (count <= 0) {
    return false;
  } else {
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
  const pomodoroCount = Math.ceil(count / 4);
  if (oneSet === 1) {
    message =
      (count / 2) % 2 !== 0 ? "お休みに移ります。" : "お休みが終わりました。";
  } else {
    message =
      (count / 2) % 2 !== 0
        ? oneSet.toString() +
          "回中" +
          pomodoroCount.toString() +
          "回ポモドーロが終わりました。お休みに移ります。"
        : "お休みが終わりました。";
  }
  return message;
}

const Home: NextPage = () => {
  const [maxWorkTime, setMaxWorkTime] = useState(25 * 60); // * 60); // * 60);
  const [maxRestTime, setMaxRestTime] = useState(5 * 60); // * 60); // * 60);
  const [count, setCount] = useState(0);
  const [oneSet, setOneSet] = useState(1);
  useEffect(() => {
    setCount(0);
  }, [oneSet]);
  useEffect(() => {
    if (count % 2 === 0 && count > 1) {
      notifyMe(makeNotifyMessage(count, oneSet));
      if (Math.floor(count / 4) === oneSet) {
        setCount(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, oneSet]);
  const countUp = useCallback(
    () =>
      setCount((prev: number) => {
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
      <div style={{ height: '80vh', margin: '0 0 0 0', backgroundColor: 'var(--background)' }}>
        <PomodoroSelect defaultMenuItem={oneSet} setOneSet={setOneSet} />
        <Container
          maxWidth="md"
          style={{
            position: "absolute",
            top: "47%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
          }}
        >
          <TomatoTimer
            key={Math.floor(count / 2).toString()}
            isAutoStart={isAuto(count, oneSet)}
            workTime={maxWorkTime}
            restTime={maxRestTime}
            countUp={countUp}
          />
        </Container>
        <div
          style={{
            textAlign: "right",
            width: "92%",
            bottom: "12%",
            position: "absolute",
          }}
        >
          <Memo />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
