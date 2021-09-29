import type { NextPage } from "next";
import Head from "next/head";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Container } from "@material-ui/core";
import TomatoTimer from "../components/templates/tomatoTimer";
import PomodoroSelect from "../components/organisms/selectCount";
import Memo from "../components/organisms/memo";
import notifyMe from "../components/organisms/notify";
import CreditFooter from "../components/organisms/creditFooter";
import { Howl } from 'howler';
import Timer from '../../public/zihou.mp3'
import { VolumeContext } from "../pages/theme";


function isAuto(count: number, oneSet: number): boolean {
  if (count === 0) {
    return false;
  } else if (oneSet === 1) {
    return count <= oneSet;
  } else {
    return Math.ceil(count / 2) < oneSet;
  }
}

function makeNotifyMessage(count: number, oneSet: number) {
  let message;
  const pomodoroCount = Math.ceil(count / 2);
  if (oneSet === 1) {
    message =
      pomodoroCount === count ? "お休みに移ります。" : "お休みが終わりました。";
  } else if (pomodoroCount !== oneSet) {
    message =
      count % 2 !== 0
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
  const [maxWorkTime, setMaxWorkTime] = useState(25 * 60);
  const [maxRestTime, setMaxRestTime] = useState(5 * 60);
  const [count, setCount] = useState(0);
  const isFirstRender = useRef(false);
  const [pushMemo, setPushMemo] = useState("");
  const [oneSet, setOneSet] = useState(1);
  const { volume } = useContext(VolumeContext);
  useEffect(() => {
    isFirstRender.current = true;
  }, []);
  useEffect(()=> {
    setCount(0);
  }, [oneSet])
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      notifyMe(makeNotifyMessage(count, oneSet));
      const sound = new Howl({ src: Timer, volume: volume / 100});
      sound.play();
      setPushMemo("");
      if (Math.ceil(count / 2) === oneSet && oneSet !== 1) {
        isFirstRender.current = true;
        setCount(0);
      } else if (oneSet === 1 && count > oneSet) {
        isFirstRender.current = true;
        setCount(0);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, oneSet, pushMemo]);
  const countUp = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [])
  return (
    <>
      <Head>
        <title>トマトタイマー</title>
      </Head>
      <Container maxWidth='md'>
        <PomodoroSelect defaultMenuItem={oneSet} setOneSet={setOneSet} />
        <TomatoTimer
          key={count.toString()}
          isAutoStart={isAuto(count, oneSet)}
          count={count}
          maxTime={count % 2 === 0 ? maxWorkTime : maxRestTime}
          countUp={countUp}
        />
      </Container>
      <div style={{marginRight: '25px', textAlign:'right'}}>
        <Memo/>
      </div>
      <CreditFooter/>
    </>
  );
};

export default Home;