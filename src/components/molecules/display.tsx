import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
});

const toClockString = (secondsLeft: number) => {
  if (secondsLeft <= 0) {
    return "0:00";
  }
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = Math.round(secondsLeft - minutes * 60);
  return `${minutes}:${("00" + seconds).slice(-2)}`;
};


const Display: React.VFC<{secondsLeft: number}> = ({secondsLeft}) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.root} align={"center"} variant="h3" color="primary">
        {toClockString(secondsLeft)}
      </Typography>
    </>
  );
};

export default Display;
