import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import styles from "./historyIcon.module.scss";
import { HistoryDialog } from "components/organisms/historyDialog";

const HistoryIcon = ({ label }: { label: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const onClick = () => {
    setDialogOpen(true);
  };

  return (
    <div className={styles.root}>
      <Typography className={styles.label}>{label}</Typography>
      <IconButton
        className={styles.iconButton}
        aria-label="history"
        onClick={() => onClick()}
      >
        <ManageSearchIcon className={styles.volumeUp} />
      </IconButton>
      <HistoryDialog
        onClose={(_isOK) => setDialogOpen(false)}
        open={dialogOpen}
      />
    </div>
  );
};

export default HistoryIcon;
