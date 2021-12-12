import React, {useContext} from "react";
import { Typography } from "@mui/material";
import { CountContext } from "../../pages/theme";
import styles from "./counter.module.scss";


const Counter = () => {
  const {count} = useContext(CountContext);
  const koPosition = count.indexOf("コ");
  const number = count.slice(0, koPosition);
  const ko = count.slice(koPosition, count.length);
  return (
    <div>
      <Typography className={styles.root}>
        <span>{"🍅"}</span>
        <span className={styles.number}> {number}</span>
        <span className={styles.kome}> {ko}</span>
      </Typography>
    </div>
  );
};

export default React.memo(Counter);
