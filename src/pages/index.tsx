import type { NextPage } from "next";

import React from "react";
import Timer from "../components/templates/timer";
import Memo from "../components/organisms/memo";
import Footer from "../components/templates/footer";
import styles from "./index.module.scss";
import Title from "../components/molecules/title";
import Theme from "./theme";
import Menu from "../components/templates/menu";
import NotificationToast from "components/organisms/notificationIcon";

const Home: NextPage = () => {
  return (
    <Theme>
      <Title title={"ポモドーロタイマー"} />
      <section className={styles.main}>
        <section className={styles.sideBarTopBar}>
          <Menu />
          <div className={styles.center}>
            <Timer />
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
