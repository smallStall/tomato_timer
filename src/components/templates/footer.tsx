import React, { useContext } from "react";
import { Typography } from "@mui/material";
import styles from "./footer.module.scss";
import TwitterIcon from "../molecules/twitterIcon";
import GithubIcon from "../molecules/githubIcon";


const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.contact}>
        <Typography className={styles.label}>Contact</Typography>
        <TwitterIcon linkUrl={"https://twitter.com/small_s_tall"} />
        <GithubIcon linkUrl={"https://github.com/smallStall/tomato_timer"} />
      </div>
      <Typography className={styles.credit}>
        BGM by OtoLogic(CC BY 4.0), Copyright smallStall
      </Typography>
    </div>
  );
};

export default Footer;
