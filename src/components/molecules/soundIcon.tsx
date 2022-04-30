import React from "react";
import { Typography, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Timer2 from "../../../public/test.mp3";
import { Howl } from "howler";
import styles from "./soundIcon.module.scss";

const DEFAULT_VOLUME = 1;

const SoundIcon = ({ label }: { label: string }) => {
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
    <div className={styles.root} onClick={() => onClick()}>
      <Typography className={styles.label}>{label}</Typography>
      <IconButton className={styles.iconButton} aria-label="sound">
        <VolumeUpIcon className={styles.volumeUp} />
      </IconButton>
    </div>
  );
};

export default SoundIcon;
