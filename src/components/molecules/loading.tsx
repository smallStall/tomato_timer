import React from "react";
import styles from "../../../src/styles/Loading.module.css";

function Loading(props: any) {
  return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/leftArrow.svg"
        className={styles.icon}
        alt="a left arrow"
        width={50}
        height={50}
      />
  );
}

export default Loading;
