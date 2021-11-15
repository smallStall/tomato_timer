import type { NextPage } from "next";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Timer from "../components/templates/timer";
import PomodoroSelect from "../components/molecules/selectCount";
import Memo from "../components/organisms/memo";
import Footer from "../components/organisms/footer";
import styles from "./index.module.scss";
import Title from "../components/molecules/title";
import Theme from "./context";
import Menu from "../components/organisms/menu";

const Home: NextPage = () => {
  const MAX_WORK_COUNT = 25 * 60;
  const MAX_REST_COUNT = 5 * 60;
  const MAX_COUNT = 1;

  const [maxWorkTime, setMaxWorkTime] = useState(MAX_WORK_COUNT); // * 60); // * 60);
  const [maxRestTime, setMaxRestTime] = useState(MAX_REST_COUNT); // * 60); // * 60);
  const [maxCount, setMaxCount] = useState(MAX_COUNT);
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
