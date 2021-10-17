import React, { useContext, useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { VolumeContext } from "../../pages/theme";
import Timer1 from "../../../public/zihou30.ogg";
import Timer2 from "../../../public/zihou30.mp3";
import { Howl } from "howler";
import styles from "../../styles/components/soundSlider.module.scss"

const SOUND_TIME = 4.0;


export default function ContinuousSlider() {
  const { volume, setVolume } = useContext(VolumeContext);
  const [ value, setValue ] = useState<number>(0);
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
        src: [Timer1, Timer2],
        volume: newValue / 100,
        html5: true,
        sprite: {
          pi: [1797000, 2800]
        },
        preload: false
      });
      sound.load();

      sound.once("load", () => {
        if (sound.duration() > SOUND_TIME && newValue > 0) {
          sound.play('pi');
        }
      });
    }
  };

  return (
    <>
      <VolumeDownIcon className={styles.volumeDown} />
      <Slider
        classes={{
          root: styles.root,
          thumb: styles.thumb,
          rail: styles.rail,
          track: styles.track,
        }}
        aria-label="Volume"
        value={value}
        onChange={handleOnChange}
        onChangeCommitted={handleOnCommit}
      />
      <VolumeUpIcon />
    </>
  );
}
