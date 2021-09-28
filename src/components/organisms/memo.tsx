import { makeStyles, TextField, createStyles, Theme } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      maxHeight: 3,
      height: 300,
      textHeight: "1.4em",
      minWidth: "20em",
      marginLeft: "auto",
    },
    shrink: {
      fontSize: "large",
      backgroundColor: theme.palette.background.default,
      paddingRight: 5,
    },
  })
);

type Prop = {};

export const Memo: React.VFC<Prop> = () => {
  const classes = useStyles();
  const [text, setText] = useState<string | null>("");

  useEffect(() => {
    if (localStorage.getItem("text") !== null) {
      setText(localStorage.getItem("text"));
    }
  }, []);

  const onWrite = (event: any) => {
    setText(event.target.value);
    localStorage.setItem("text", event.target.value);
  };

  return (
    <TextField
      color="primary"
      classes={{
        root: classes.root,
      }}
      label="思い出しメモ"
      InputLabelProps={{className: classes.shrink, shrink: true}}
      variant="outlined"
      multiline={true}
      rows={4}
      value={text}
      onChange={onWrite}

    />
  );
};

export default Memo;
