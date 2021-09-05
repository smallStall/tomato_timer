import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
});

const toClockString = (timeLeft: number) => {
  if (timeLeft <= 0) {
    return "0:00";
  }
  const minutes = Math.floor(timeLeft);
  const seconds = Math.round((timeLeft - minutes) * 60);
  return `${minutes}:${("00" + seconds).slice(-2)}`;
};


const Display: React.VFC<{minutesLeft: number}> = ({minutesLeft}) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.root} align={"center"} variant="h3">
        {toClockString(minutesLeft)}
      </Typography>
    </>
  );
};

export default Display;
