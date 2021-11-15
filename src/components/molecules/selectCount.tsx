import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
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
        Count
      </InputLabel>
      <Select
        classes={{root: styles.select, icon:styles.icon, outlined:styles.outlined}}
        value={defaultMenuItem}
        onChange={(event: SelectChangeEvent<number>) => {
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
