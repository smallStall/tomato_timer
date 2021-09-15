import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  remainTime:{
    marginTop: 20,
  },
})

export const RemainTime: React.VFC<{time: string}> = ({time}) => {
  const classes = useStyles();
  return(
    <Typography
      className={classes.remainTime}
      align={'center'}
      variant="h3"
    >{time}</Typography>
  )
}

export default RemainTime;