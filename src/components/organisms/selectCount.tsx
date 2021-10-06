import {
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Style } from "@material-ui/icons";
import React, { Dispatch, SetStateAction } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: 40,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30,
      },

    },
    root: {
      width: 120,
      color: theme.palette.primary.main,
    },
    shrinkInputLabel: {
      fontSize: "large",
    },
  })
);

type Props = {
  defaultMenuItem: number;
  setOneSet: Dispatch<SetStateAction<number>>;
};

export const PomodoroSelect: React.VFC<Props> = ({
  defaultMenuItem,
  setOneSet,
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel classes={{ shrink: classes.shrinkInputLabel }}>
        Count / Set
      </InputLabel>
      <Select
        className={classes.root}
        value={defaultMenuItem}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setOneSet(event.target.value as number);
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PomodoroSelect;
