import React, { useContext, useState, useEffect } from "react";
import { Slider, Typography } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { VolumeContext } from "../../pages/theme";
import Timer2 from "../../../public/zihou1.mp3";
import { Howl } from "howler";
import { MobileContext } from "../../pages/theme";
import styles from "./soundSlider.module.scss";

const DEFAULT_VOLUME = 100;

export default function ContinuousSlider() {
  const { volume, setVolume } = useContext(VolumeContext);
  const [value, setValue] = useState<number>(DEFAULT_VOLUME);
  useEffect(() => {
    if (localStorage.getItem("volume") != null) {
      setVolume(Number(localStorage.getItem("volume")));
      setValue(Number(localStorage.getItem("volume")));
    }else{
      setValue(DEFAULT_VOLUME);
      setVolume(DEFAULT_VOLUME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (_event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };
  const handleOnCommit = (_event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue);
      localStorage.setItem("volume", newValue.toString());
      const sound = new Howl({
        src: [Timer2],
        volume: newValue / 100,
        html5: true,
        sprite: {
          pi: [1800000, 2800],
        },
        preload: false,
      });
      if (newValue > 0) {
        sound.load();
      }
      sound.once("load", () => {
        sound.play("pi");
        sound.volume(newValue / 100);
      });
    }
  };

  return (
    <div className={styles.root}>
      <Typography>Sound</Typography>
      <VolumeDownIcon />
      <Slider
        classes={{
          root: styles.slider,
          thumb: styles.thumb,
          rail: styles.rail,
          track: styles.track,
        }}
        aria-label="Volume"
        value={value}
        onChange={handleOnChange}
        onChangeCommitted={handleOnCommit}
        step={useContext(MobileContext).isMobile ? 100 : 1}
      />
      <VolumeUpIcon className={styles.volumeUp} />
    </div>
  );
}
