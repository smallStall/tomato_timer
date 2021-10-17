import { TextField } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { InputMemoContext } from "../../pages/theme";
import styles from "../../styles/components/memo.module.scss";

type Prop = {};

export const Memo: React.VFC<Prop> = () => {
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
    <TextField
      className={styles.root}
      label="Memo"
      InputProps={{
        classes: { root: styles.input, focused: styles.focused },
        onFocus: () => setInputMemo(true),
        onBlur: () => setInputMemo(false),
      }}
      InputLabelProps={{
        classes: { root: styles.input, shrink: styles.shrink },
      }}
      variant="outlined"
      multiline={true}
      rows={4}
      value={text}
      onChange={onWrite}
    />
  );
};

export default Memo;
