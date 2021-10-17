import React, { useContext } from "react";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { InputMemoContext } from "../../pages/theme";
import styles from "../../styles/components/footer.module.scss";

function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}

const Footer = () => {
  const { isInputMemo } = useContext(InputMemoContext);
  return (
    <div
      className={
        isInputMemo && isSmartPhone() ? styles.empty : styles.root
      }
    >
      <Typography className={styles.credit}>
        BGM by OtoLogic(CC BY 4.0), Copyright Small Stall
      </Typography>
    </div>
  );
};

export default Footer;
