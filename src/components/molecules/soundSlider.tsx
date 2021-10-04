import React, { useContext, useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { VolumeContext } from "../../pages/theme";
import Timer from "../../../public/zihou30.ogg";
import { Howl } from "howler";
const SOUND_TIME = 4.0;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thumb: {
      color: theme.palette.primary.contrastText,
    },
    root: {
      width: "9%",
      margin: "10px 10px 10px 5px",
    },
    rail: {
      color: theme.palette.primary.light,
    },
    activeRail: {
      color: theme.palette.primary.contrastText,
    },
    volumeDown: {
      marginLeft: "8px",
    },
  })
);

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
        src: Timer,
        volume: newValue / 100,
        html5: true,
        preload: false,
      });

      sound.once("load", () => {
        if (sound.duration() > SOUND_TIME) {
          sound.seek(sound.duration() - SOUND_TIME);
          sound.play();
        }
      });
    }
  };
  const classes = useStyles();

  return (
    <>
      <VolumeDownIcon className={classes.volumeDown} />
      <Slider
        classes={{
          root: classes.root,
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.activeRail,
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
