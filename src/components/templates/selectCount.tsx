import { makeStyles, Select, MenuItem, InputLabel, FormControl, ThemeProvider } from "@material-ui/core";
import React, {useState, Dispatch, SetStateAction} from "react";

const useStyles = makeStyles({
  formControl:{
    marginTop: 40, 
  },
  selectCount: {
    width: 130
  }
})

type Props = {
  defaultMenuItem: number,
  setOneSet: Dispatch<SetStateAction<number>>
};

export const PomodoroSelect: React.VFC<Props> = ({defaultMenuItem, setOneSet}) => {
  const classes = useStyles();
  return(
    <FormControl className={classes.formControl}>
    <InputLabel>ポモドーロ回数</InputLabel>
    <Select
      className={classes.selectCount}
      value={defaultMenuItem}
      onChange={
        (event: React.ChangeEvent<{ value: unknown }>) => {
          setOneSet(event.target.value as number);
        }
      }
    >
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
    </Select>
    </FormControl>
  )
}

export default PomodoroSelect;