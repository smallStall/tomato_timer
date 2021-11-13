import { Select, MenuItem, InputLabel, FormControl, InputBase } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./selectCount.module.scss";

type Props = {
  defaultMenuItem: number;
  setOneSet: Dispatch<SetStateAction<number>>;
};

export const PomodoroSelect: React.VFC<Props> = ({
  defaultMenuItem,
  setOneSet,
}) => {
  return (
    <FormControl classes={{ root: styles.formControl }}>
      <InputLabel classes={{ shrink: styles.shrinkInputLabel }}>
        Count / Set
      </InputLabel>
      <Select
        classes={{root: styles.root, icon:styles.icon}}
        value={defaultMenuItem}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setOneSet(typeof(event.target.value) === 'number' ? event.target.value : 1);
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PomodoroSelect;
