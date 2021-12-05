import React, {useContext} from "react";
import { Typography } from "@mui/material";
import { CountContext } from "../../pages/theme";
import styles from "./counter.module.scss";


function zenkakuToHankaku(num: number) {
  return num.toString().replace(/[0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}

const Counter = () => {
  const {count} = useContext(CountContext);
  return (
    <div>
      <Typography className={styles.root}>
        <span className={styles.number}> {"🍅" + zenkakuToHankaku((count + 1) % 100)}</span>
        <span className={styles.kome}>{"コ目"}</span>
      </Typography>
    </div>
  );
};

export default React.memo(Counter);
