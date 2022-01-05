import { TextField } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { isMobile } from "libs/accesories";
import styles from "./memo.module.scss";

type Prop = {};
const ID = "inputFieldId";

export const Memo: React.VFC<Prop> = () => {
  const [text, setText] = useState<string | null>("");
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    setMobile(isMobile());
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
      label="メモ"
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
      rows={ mobile ? 3 : 5}
      value={text}
      onChange={onWrite}
    />
  );
};

export default Memo;
