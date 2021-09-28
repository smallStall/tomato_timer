import React, {useContext} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { VolumeContext } from "../../pages/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thumb: {
      color: theme.palette.primary.contrastText,
    },
    root: {
      width: "9%",
      margin: '10px 10px 10px 5px',
    },
    rail: {
      color: theme.palette.primary.light,
    },
    activeRail: {
      color: theme.palette.primary.contrastText,
    },
    volumeDown: {
      marginLeft: '8px',
    }
  })
);


export default function ContinuousSlider() {
  const { volume, setVolume } = useContext(VolumeContext);

  const handleChange = (event: any, newValue: number | number[]) => {
    setVolume(newValue as number);
  };
  const classes = useStyles();

  return (
    <>
        <VolumeDownIcon
          className={classes.volumeDown}
        />
        <Slider
          classes={{
          root: classes.root,
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.activeRail,
        }}
          aria-label="Volume"
          value={volume}
          onChange={handleChange}
          onChangeCommitted={() => localStorage.setItem("volume", volume.toString())}
        />
        <VolumeUpIcon />
    </>
  );
}