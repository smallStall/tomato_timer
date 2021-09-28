import React from "react";
import { makeStyles, createStyles, Theme, Box, Typography } from "@material-ui/core";
import { withThemeCreator } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    creditFooter: {
      width: "100%",
      height: "10%",
      position: "absolute",
      bottom: 0,
      background: theme.palette.secondary.main,
      boxShadow: '0 0 7px 0 black',
    },
    credit: {
      color: theme.palette.primary.contrastText,
      margin: "0 20px 10px 0",
      position: "absolute",
      bottom: '5px',
      right: '5px',
    }
  })
);

const CreditFooter = () => {
  const classes = useStyles();
  return <div className={classes.creditFooter}>
    <Typography className={classes.credit}>Copyright Small Tall</Typography>
  </div>;
};

export default CreditFooter;
