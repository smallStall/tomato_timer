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
  button: boolean;
  vertical: Vertial;
  horizontal: Horizontal;
};

export default function MsgToast({
  message,
  open,
  handleClose,
  button,
  vertical,
  horizontal,
}: Props) {
  const action = button ? (
    <React.Fragment>
      <Button size="small" onClick={() => handleClose(true)}>
        はい
      </Button>
      <Button size="small" onClick={() => handleClose(false)}>
        キャンセル
      </Button>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClose(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  ) : (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleClose(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={15000}
        onClose={(_event: React.SyntheticEvent | Event, reason?: string) => {
          if(reason === "clickaway"){
            return;
          }
          handleClose(false)}
        }
        message={message}
        action={action}
        anchorOrigin={{ horizontal, vertical }}
        sx={{ width: "37em" }}
      />
    </div>
  );
}
