import React, { useContext } from "react";
import { Typography } from "@mui/material";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div
      className={
        styles.root
      }
    >
      <Typography className={styles.credit}>
        BGM by OtoLogic(CC BY 4.0), Copyright Small Stall
      </Typography>
    </div>
  );
};

export default Footer;
