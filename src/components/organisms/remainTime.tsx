import { makeStyles, Typography, createStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 20,
    },
  })
);

export const RemainTime: React.VFC<{ time: string }> = ({ time }) => {
  const classes = useStyles();
  return (
    <Typography
      classes={{ root: classes.root }}
      align={"center"}
      variant="h3"
    >
      {time}
    </Typography>
  );
};

export default RemainTime;
