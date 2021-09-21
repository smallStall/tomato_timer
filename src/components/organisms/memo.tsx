import { makeStyles, TextField, createStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 50,
    },
  })
);

type Prop = {};

export const Memo: React.VFC<Prop> = () => {
  const classes = useStyles();
  return (
    <TextField
      color='primary'
      className={classes.root}
      label="思い出しメモ"
      InputLabelProps={{}}
      fullWidth
      variant="outlined"
    />
  );
};

export default Memo;
