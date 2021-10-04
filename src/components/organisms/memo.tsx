import { makeStyles, TextField, createStyles, Theme } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { InputMemoContext } from "../../pages/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      margin: "20 0 20 auto",
      maxHeight: 3,
      height: 300,
      textHeight: "1.4em",
      minWidth: "20em",
    },
    input: {
      color: theme.palette.primary.main,
      fontSize: "0.95rem",
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
  const { setInputMemo } = useContext(InputMemoContext);

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
    <div>
      <TextField
        color="primary"
        className={classes.root}
        label="Memo"
        InputProps={{
          className: classes.input,
          onFocus: () => setInputMemo(true),
          onBlur: () => setInputMemo(false),
        }}
        InputLabelProps={{
          classes: { root: classes.input, shrink: classes.shrink },
        }}
        variant="outlined"
        multiline={true}
        rows={4}
        value={text}
        onChange={onWrite}
      />
    </div>
  );
};

export default Memo;
