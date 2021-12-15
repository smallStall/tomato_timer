import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

type Props = {
  msg: string;
  open: boolean;
  onClose: (isOk: boolean) => void;
};

const MsgBox: React.VFC<Props> = ({ msg, open, onClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={() => onClose(false)}
        aria-labelledby="common-dialog-title"
        aria-describedby="common-dialog-description"
      >
        <DialogContent>{msg}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose(true);
            }}
            color="primary"
          >
            はい
          </Button>
          <Button
            onClick={() => {
              onClose(false);
            }}
            color="primary"
          >
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MsgBox;
