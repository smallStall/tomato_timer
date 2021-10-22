import type { NextPage } from "next";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Container from "@material-ui/core/Container";
import TomatoTimer from "../components/templates/tomatoTimer";
import PomodoroSelect from "../components/organisms/selectCount";
import Memo from "../components/organisms/memo";
import notifyMe from "../components/organisms/notify";
import Footer from "../components/organisms/footer";
import styles from "../styles/components/index.module.scss";

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

function isAuto(count: number, oneSet: number): boolean {
  if (count <= 0) {
    return false;
  } else {
    return Math.floor(count / 2) < oneSet;
  }
}

const Home: NextPage = () => {
  const [maxWorkTime, setMaxWorkTime] = useState(45); // * 60); // * 60);
  const [maxRestTime, setMaxRestTime] = useState(7); // * 60); // * 60);
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
      <div className={styles.center}>
        <PomodoroSelect defaultMenuItem={oneSet} setOneSet={setOneSet} />
        <Container maxWidth="md" className={styles.container}>
          <TomatoTimer
            key={Math.floor(count / 2).toString() + "timer"}
            isAutoStart={isAuto(count, oneSet)}
            workTime={maxWorkTime}
            restTime={maxRestTime}
            countUp={countUp}
          />
        </Container>
        <div className={styles.memoDiv}>
          <Memo />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
