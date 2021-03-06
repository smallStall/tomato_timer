import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import styles from "./historyIcon.module.scss";
import { HistoryDialog } from "components/organisms/historyDialog";

const HistoryIcon = ({ label }: { label: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const onClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div className={styles.root} onClick={() => onClick()}>
        <Typography className={styles.label}>{label}</Typography>
        <IconButton className={styles.iconButton} aria-label="history">
          <ManageSearchIcon className={styles.volumeUp} />
        </IconButton>
      </div>
      <HistoryDialog
        onClose={(_isOK) => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  );
};

export default HistoryIcon;
