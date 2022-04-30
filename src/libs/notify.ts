import { toast } from 'react-toastify';
import { Activity, Status } from 'types/intervalTimer';

export function toastTomato() {
  const count = getVisitedCount();
  if (count < 2) {
    toast('タイムボックス用のタイマーです。音が鳴るので気をつけてください。', { icon: '🔊', autoClose: 10000, position: "bottom-right" });
  }
  plusVititedCount();
}

export function getVisitedCount() {
  const toastCount = localStorage.getItem('visited');
  const count: number = toastCount == null ? 0 : Number(toastCount.toString());
  return count;
}

function plusVititedCount() {
  const count: number = getVisitedCount();
  localStorage.setItem('visited', (count + 1).toString());
}
/*
export function notifyMe(message: string) {
  toast(message, { icon: '🍅', autoClose: 5000, position: "bottom-right" })
}
*/

export function pomodoroNotification(message: string) {
  const notification = new Notification(
    'トマトタイマー',
    {
      body: message,
      tag: 'pomodoro-timer',
      renotify: true,
    });
  //renotifyがFireFoxでどうなるか確認
}

export function getPermission() {
  if (!("Notification" in window)) {
    return 'none';
  }
  else {
    return Notification.permission;
  }
}

export function makeNotifyMessage(count: number, activity: Activity) {
  if (activity === "None") {
    return "トマトを" + (count + 1).toString() + "コ全て取りました🍅🍅🍅🍅"
  }
  if (activity === "NextRest" || activity === "Rest") {
    return (count + 1).toString() + "個ポモドーロを達成しました。リフレッシュしましょう。";
  } else if ((activity === "NextWork" || activity === "Work")) {
    return "リフレッシュが終わりました。作業に移ります。";
  } else {
    return "";
  }
}

export const returnActivity = (status: Status, count: string, activity: Activity, min: number) => {

  const minStr = min + "分";
  const minSecStr: string = (minStr === "0分" ? "あと少し" : minStr);
  const countStr = "・" + count.toString() + "🍅";
  switch (activity) {
    case "NextRest":
      return minSecStr + countStr;
    case "NextWork":
      return minSecStr + countStr;
    case "Work":
      return minSecStr + "・作業中" + countStr;
    case "Rest":
      return minSecStr + "・リフレッシュ中" + countStr;
    default:
      return "トマトタイマー"
  }
};