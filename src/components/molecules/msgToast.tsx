import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Vertial = "top" | "bottom";
type Horizontal = "left" | "center" | "right";

type Props = {
  message: string;
  open: boolean;
  handleClose: (isOk: boolean) => void;
  buttonNum?: number;
  yesLabel?: string;
  vertical?: Vertial;
  horizontal?: Horizontal;
  duration?: number;
};

export default function MsgToast({
  message,
  open,
  handleClose = (isOk: boolean) => {
    open = false;
    return isOk;
  },
  duration = 11000,
  buttonNum = 0,
  yesLabel = "はい",
  vertical = "bottom",
  horizontal = "right",
}: Props) {
  if (buttonNum < 0 || buttonNum > 2) {
    throw new Error("buttonNum validation error");
  }
  const yesButton = (
    <Button size="small" onClick={() => handleClose(true)}>
      {yesLabel}
    </Button>
  );
  const cancelButton = (
    <Button size="small" onClick={() => handleClose(false)}>
      キャンセル
    </Button>
  );
  const cancelIcon = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleClose(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const action =
    buttonNum === 0 ? (
      <>{cancelIcon}</>
    ) : buttonNum === 1 ? (
      <>{yesButton}</>
    ) : (
      <>
        {cancelButton}
        {yesButton}
        {cancelIcon}
      </>
    );

  return (
    <div>
      <Snackbar
        onClick={() => handleClose(true)}
        open={open}
        autoHideDuration={duration}
        onClose={(_event: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === "clickaway") {
            return;
          }
          handleClose(false);
        }}
        message={message}
        action={action}
        anchorOrigin={{ horizontal, vertical }}
        sx={{ width: "16em", fontSize: "1.4em", cursor: "pointer"}}
        disableWindowBlurListener={true}
      />
    </div>
  );
}
