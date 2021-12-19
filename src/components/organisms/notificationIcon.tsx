import React, { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { pomodoroNotification } from "libs/notify";
import styles from "./notificationIcon.module.scss";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import MsgToast from "components/molecules/msgToast";
import { Horizontal, Vertical, Permission } from "types/notification";
import { getPermission } from "libs/notify";

const NotificationIcon = ({ label }: { label: string }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonNum, setButtonNum] = useState(0);
  const [isNotified, setNotify] = useState(false);
  const [horizontal, setHorizontal] = useState<Horizontal>("right");
  const [vertical, setVertical] = useState<Vertical>("top");
  const [permission, setPermission] = useState<Permission>("none");
  useEffect(() => {
    if (getPermission() === "none") {
      setPermission("none");
    } else {
      setPermission(getPermission());
    }
  }, []);

  useEffect(() => {
    const notified = localStorage.getItem("isNotified");
    if (notified === "false") {
      setNotify(false);
    } else if (permission === "granted") {
      setNotify(true);
    }
  }, [permission]);

  const openToast = (
    message: string,
    buttonNum: number,
    horizontal?: Horizontal,
    vertical?: Vertical
  ) => {
    setMessage(message);
    setButtonNum(buttonNum);
    setHorizontal(horizontal ?? "center");
    setVertical(vertical ?? "top");
    setOpen(true);
  };

  const handleClose = (isOK: boolean) => {
    setOpen(false);
    if (!isOK) {
      return;
    }
  };
  const handleClick = () => {
    if (permission === "default") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          setPermission(permission);
          localStorage.setItem("isNotified", "true");
          setNotify(true);
          pomodoroNotification("通知を有効にしました。");
        }
      });
      openToast(
        `デスクトップ通知が許可されていません。
        通知を有効にするとこの画面がアクティブでなくてもタイマーの通知がディスプレイに出て来るようになります。
        通知を許可するにはブラウザにてサイトの設定をご確認ください。`,
        0,
        "right"
      );
    } else if (permission === "denied") {
      openToast(
        `デスクトップ通知が許可されていません。
        通知を許可するにはブラウザにてサイトの設定をご確認ください。`,
        0
      );
    } else if (permission === "granted"){
      if (localStorage.getItem("isNotified") == null) {
        localStorage.setItem("isNotified", "false");
        setNotify(false);
      } else if (localStorage.getItem("isNotified") == "true") {
        localStorage.setItem("isNotified", "false");
        setNotify(false);
      } else {
        localStorage.setItem("isNotified", "true");
        setNotify(true);
      }
    }
  };
  return (
    <div className={styles.root}>
      <Typography className={styles.label}>{label}</Typography>
      <IconButton
        className={styles.iconButton}
        aria-label="notification"
        onClick={handleClick}
      >
        {isNotified ? (
          <NotificationsActiveIcon className={styles.icon} />
        ) : (
          <NotificationsOffIcon className={styles.icon} />
        )}
      </IconButton>
      <MsgToast
        open={open}
        message={message}
        handleClose={handleClose}
        yesLabel="はい"
        buttonNum={buttonNum}
        horizontal={horizontal}
        vertical={vertical}
      />
    </div>
  );
};

export default NotificationIcon;
