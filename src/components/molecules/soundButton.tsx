import React from "react";
import { Typography, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Timer2 from "../../../public/test.mp3";
import { Howl } from "howler";
import styles from "./soundButton.module.scss";
import { ClassNames } from "@emotion/react";

const DEFAULT_VOLUME = 1;

const SoundButton = ({ label }: { label: string }) => {
  const onClick = () => {
    const sound = new Howl({
      src: [Timer2],
      volume: DEFAULT_VOLUME,
      html5: true,
      preload: false,
    });
    sound.load();
    sound.once("load", () => {
      sound.play();
    });
  };

  return (
    <div className={styles.root}>
      <Typography>{label}</Typography>
      <IconButton className={styles.iconButton} aria-label="sound" onClick={() => onClick()} >
        <VolumeUpIcon className={styles.volumeUp} />
      </IconButton>
    </div>
  );
};

export default SoundButton;
