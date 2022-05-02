import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { CountContext } from "../../pages/theme";
import styles from "./maxTomato.module.scss";

type Props = {
  open: boolean;
  onClose: (isOk: boolean) => void;
};

export const MaxTomatoDialog: React.VFC<Props> = ({ open, onClose }) => {
  const { count, setCount } = useContext(CountContext);
  const [sliderVal, setSliderVal] = useState(count.maxCount);

  const onCommitSlider = (_event: any, value: number | number[]) => {
    if (typeof value === "number") {
      if (value >= 0) {
        setSliderVal(value);
        setCount({ ...count, maxCount: value });
      }
    }
  };
  const onChangeSlider = (_event: any, value: number | number[]) => {
    if (typeof value === "number") {
      if (value >= 0) {
        setSliderVal(value);
      }
    }
  };
  const calcFinishedTime = (sliderVal: number) => {
    if (sliderVal === 0) {
      return "";
    }
    const now = new Date();
    now.setMinutes(now.getMinutes() + (sliderVal - 1) * 30 - 5 + count.nokoriMinutes);
    return (
      "終了予定時間 " +
      now.getHours().toString() +
      ":" +
      ("00" + now.getMinutes()).slice(-2)
    );
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby="トマトをいくつ取る？"
      aria-describedby="トマトの最大数"
      maxWidth="xl"
    >
      <DialogTitle sx={{ paddingBottom: "60px" }}>
        トマトをいくつ取る？
      </DialogTitle>
      <Slider
        aria-label="Custom marks"
        defaultValue={0}
        step={1}
        max={8}
        valueLabelDisplay="on"
        onChangeCommitted={onCommitSlider}
        onChange={onChangeSlider}
        classes={{
          root: styles.root,
          thumb: styles.thumb,
          markLabel: styles.markLabel,
          markLabelActive: styles.markLabelActive,
          track: styles.track,
          rail: styles.rail,
          mark: styles.mark,
          markActive: styles.markActive,
          valueLabel: styles.valueLabel,
        }}
      />
      <Typography sx={{ marginLeft: "2.5em" }}>
        {calcFinishedTime(sliderVal)}
      </Typography>
      <DialogActions>
        <Button
          onClick={() => {
            onClose(false);
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
