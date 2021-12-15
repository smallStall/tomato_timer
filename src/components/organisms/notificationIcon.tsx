import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { pomodoroNotification } from "libs/notify";
import styles from "./notificationIcon.module.scss";
import MsgBox from "components/molecules/msgbox";

const NotificationIcon = ({ label }: { label: string }) => {
  const [isNotification, setNotification] = useState(false); //string -> boolean
  const [open, setOpen] = useState(false);
  const handleClose = (isOK : boolean) => {
    setOpen(false);
    if(!isOK){
      return;
    }
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        setNotification(true);
        pomodoroNotification("通知を有効にしました。");
      }
    });
  };
  useEffect(() => {
    const currentTheme = localStorage.getItem("notification");
  }, []);

  const toggleNotification = () => {
    setOpen((open) => !open);
  };

  return (
    <div>
      <FormControlLabel
        className={styles.root}
        label={label}
        classes={{
          label: styles.label,
        }}
        labelPlacement="start"
        control={
          <Switch
            classes={{
              root: styles.switch,
              switchBase: styles.switchBase,
              checked: styles.checked,
              thumb: styles.thumb,
              track: styles.track,
            }}
            checked={isNotification}
            onChange={toggleNotification}
          />
        }
      />
      <MsgBox
        msg="タイマーをリセットして始めますか？"
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default NotificationIcon;
