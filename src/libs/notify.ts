import { toast } from 'react-toastify';
import { Activity, Status, StatusValues } from 'types/intervalTimer';

export function toastTomato() {
  if (isToast()) {
    toast('ポモドーロ・テクニック用のタイマーです。音が鳴るので気をつけてください。', { icon: '🔊', autoClose: 10000 });
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


export function makeNotifyMessage(count: number, activity: Activity) {

  if (activity === "NextRest") {
    return (count + 1).toString() + "個ポモドーロが終わりました。お休みに移ります。";
  } else {
    return "お休みが終わりました。";
  }
}

export const returnActivity = (status: Status, count: number, activity: Activity, displayTime: number) => {
  if (status === StatusValues.stopped) {
    return "ポモドーロ・タイマー"
  }
  const min = Math.floor(displayTime / 60);
  const minStr = min === 0 ? Math.floor(displayTime / 10) * 10 + "秒" : min + "分";
  const countStr: string = "・残り" + minStr + "・🍅" + (count + 1).toString() + "コ目";
  switch (activity) {
    case "NextRest":
      return "準備中" + countStr;
    case "NextWork":
      return "準備中" + countStr;
    case "Work":
      return "作業中" + countStr;
    case "Rest":
      return "休憩中" + countStr;
  }
};