import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ThemeIcon from "./themeIcon";
import SoundSlider from '../molecules/soundSlider'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolBar: {
      minHeight: '6vh',
    },
    appBar: {
      backgroundColor: theme.palette.secondary.main,
    },
    title: {
      marginTop: '5px',
      flexGrow: 1,
    },
  })
);

export default function MenuAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>
            Pomodoro Timer
          </Typography>
        </Toolbar>
        <div style={{display: 'flex', alignContent: 'flex-start', alignItems:'center'}}>
          <ThemeIcon />
          <SoundSlider
          />
        </div>
      </AppBar>
    </div>
  );
}
