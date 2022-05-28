import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import { CountContext } from "../../pages/theme";
import { MaxTomatoDialog } from "components/organisms/maxTomatoDialog";
import styles from "./counter.module.scss";

const Counter = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const onClick = () => {
    setDialogOpen(true);
  };

  const { count } = useContext(CountContext);
  const nowCount = count.now;
  const koPosition = nowCount.indexOf("コ");
  const number = nowCount.slice(0, koPosition);
  const ko = nowCount.slice(koPosition, nowCount.length);
  return (
    <>
      <div onClick={() => onClick()}>
        <Typography className={styles.root}>
          <span>{"🍅"}</span>
          <span className={styles.number}> {number}</span>
          <span className={styles.kome}>
            {" "}
            {ko +
              (count.maxCount === 0 ? "" : "/" + count.maxCount.toString() + "コ")}
          </span>
        </Typography>
      </div>
      <MaxTomatoDialog
        onClose={(_isOK) => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  );
};

export default React.memo(Counter);
