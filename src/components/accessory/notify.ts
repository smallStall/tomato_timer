import { toast } from 'react-toastify';
import { Activity } from 'types/intervalTimer';

export function toastTomato() {
  if (isToast()) {
    toast('音が鳴るので気をつけてください', { icon: '🔊' });
  }
}

function isToast() {
  const toastCount = localStorage.getItem('toast');
  if (toastCount === '1') {
    return false;
  } else if (toastCount === '0') {
    localStorage.setItem('toast', '1')
    return true;
  } else if (toastCount == null) {
    localStorage.setItem('toast', '0');
    return true;
  }
}


export function notifyMe(message: string) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    //toast('デスクトップ通知が有効になっていません。有効にするには通知設定をご確認ください。');
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    pomodoroNotification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        pomodoroNotification(message);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

function pomodoroNotification(message: string) {
  const notification = new Notification(
    'ポモドーロタイマー',
    {
      body: message,
      tag: 'pomodoro-timer',
      renotify: true,
    });
    //renotifyがFireFoxでどうなるか確認
}


export function makeNotifyMessage(count: number, maxCount: number, activity: Activity) {

  if (maxCount === 1) {
    return activity === "NextRest" ?
      "お休みに移ります。" : "お休みが終わりました。";
  } else {
    return activity === "NextRest" ?
      maxCount.toString() +
      "回中" +
      (count + 1).toString() +
      "回ポモドーロが終わりました。お休みに移ります。"
      : "お休みが終わりました。";
  }
}

export const returnActivity = (activity: Activity, count: number, maxCount: number, status: string) => {
  const countPerMax = maxCount === 1 ? "" : "(" + count + "/" + maxCount.toFixed() + ")"
  if (status === "STOPPED") {
    return "ポモドーロタイマー"
  }
  switch (activity) {
    case "NextRest":
      return "準備中" + countPerMax;
    case "NextWork":
      return "準備中" + countPerMax;
    case "Work":
      return "作業中" + countPerMax;
    case "Rest":
      return "休憩中" + countPerMax;
  }
};

export const returnFavicon = (activity: Activity) => {
  if (activity === "None") {
    return "";
  } else if (activity === "Work") {
    return "-work";
  } else {
    return "-rest";
  }
};

