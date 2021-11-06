import React, { useContext, useState, useEffect } from "react";
import { Slider, Typography } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { VolumeContext } from "../../pages/theme";
import Timer2 from "../../../public/zihou1.mp3";
import { Howl } from "howler";
import { MobileContext } from "../../pages/theme";
import styles from "../../styles/components/soundSlider.module.scss";



const SOUND_TIME = 4.0;

export default function ContinuousSlider() {
  const { volume, setVolume } = useContext(VolumeContext);
  const [value, setValue] = useState<number>(100);
  useEffect(() => {
    if (localStorage.getItem("volume") !== null) {
      setVolume(Number(localStorage.getItem("volume")));
      setValue(Number(localStorage.getItem("volume")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };
  
  const handleOnCommit = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue);
      localStorage.setItem("volume", newValue.toString());
      const sound = new Howl({
        src: [Timer2],
        volume: newValue / 100,
        html5: true,
        sprite: {
          pi: [1797000, 2800],
        },
        preload: false,
      });
      if (newValue > 0) {
        sound.load();
      }
      sound.once("load", () => {
        if (sound.duration() > SOUND_TIME) {
          sound.play("pi");
          sound.volume(newValue / 100);
        }
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
      <VolumeUpIcon className={styles.volumeUp}/>
    </div>
  );
}
