import React, {useContext} from "react";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { InputMemoContext } from "../../pages/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    creditFooter: {
      bottom: 0,
      width: "100%",
      height: "10vh",
      position: "absolute",
      background: theme.palette.secondary.main,
      boxShadow: '0 0 7px 0 black',
    },
    emptyFooter: {
      display: 'none'
    },

    credit: {
      color: theme.palette.primary.contrastText,
      margin: "0 20px 10px 0",
      position: "absolute",
      bottom: '5px',
      right: '5px',
      fontSize: 'small'
    }
  })
);

function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}

const CreditFooter = () => {
  const classes = useStyles();
  const { isInputMemo } = useContext(InputMemoContext);
  return <div className={isInputMemo && isSmartPhone() ? classes.emptyFooter : classes.creditFooter}>
    <Typography className={classes.credit}>BGM by OtoLogic(CC BY 4.0), Copyright Small Stall</Typography>
  </div>;
};

export default CreditFooter;
