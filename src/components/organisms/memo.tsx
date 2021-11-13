import { TextField } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import styles from "./memo.module.scss";

type Prop = {};
const ID = "inputFieldId";

export const Memo: React.VFC<Prop> = () => {
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
      className={styles.root}
      label="Memo"
      InputProps={{
        id: ID,
        classes: {
          root: styles.input,
          focused: styles.focused,
          notchedOutline: styles.outline,
        },
      }}
      InputLabelProps={{
        classes: { root: styles.input, shrink: styles.shrink },
      }}
      variant="outlined"
      multiline={true}
      rows={3}
      value={text}
      onChange={onWrite}
    />
  );
};

export default Memo;
