import type { NextPage } from "next";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Timer from "../components/templates/timer";
import PomodoroSelect from "../components/organisms/selectCount";
import Memo from "../components/organisms/memo";
import Footer from "../components/organisms/footer";
import styles from "../styles/components/index.module.scss";
import Title from "../components/molecules/title";
import Theme from "./theme";
import Menu from "../components/organisms/menu";

const Home: NextPage = () => {
  const [maxWorkTime, setMaxWorkTime] = useState(25 * 60); // * 60); // * 60);
  const [maxRestTime, setMaxRestTime] = useState(5 * 60); // * 60); // * 60);
  const [maxCount, setMaxCount] = useState(1);
  return (
    <Theme>
      <Title />
      <section className={styles.main}>
        <section className={styles.sideBarTopBar}>
          <Menu />
          <div className={styles.center}>
            <PomodoroSelect
              defaultMenuItem={maxCount}
              setOneSet={setMaxCount}
            />
            <Timer
              workTime={maxWorkTime}
              restTime={maxRestTime}
              maxCount={maxCount}
            />
            <div className={styles.memoDiv}>
              <Memo />
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </Theme>
  );
};

export default Home;
