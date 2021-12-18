import { toast } from 'react-toastify';
import { Activity, Status } from 'types/intervalTimer';

export function toastTomato() {
  const count = getVisitedCount();
  if (count < 2) {
    toast('ポモドーロ・テクニック用のタイマーです。音が鳴るので気をつけてください。', { icon: '🔊', autoClose: 10000, position: "bottom-right" });
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

export function notifyMe(message: string) {
  /*
  if (Notification.permission === "granted" && localStorage.getItem("isNotified") == "true") {
    pomodoroNotification(message);
  } else {
  */
    toast(message, { icon: '🍅', autoClose: 5000, position: "bottom-right" })
  //}

}

export function pomodoroNotification(message: string) {
  const notification = new Notification(
    'ポモドーロタイマー',
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

  if (activity === "NextRest") {
    return (count + 1).toString() + "個ポモドーロを達成しました。リフレッシュしましょう。";
  } else {
    return "リフレッシュが終わりました。作業に移ります。";
  }
}

export const returnActivity = (status: Status, count: string, activity: Activity, displayTime: number) => {

  const min = Math.floor(displayTime / 60);
  const minStr = min === 0 ? Math.floor(displayTime / 10) * 10 + "秒" : min + "分";
  const minSecStr: string = (minStr === "0秒" ? "まもなく" : minStr);
  const countStr = "・🍅" + count.replace("　", "");
  switch (activity) {
    case "NextRest":
      return minSecStr + "・準備中" + countStr;
    case "NextWork":
      return minSecStr + "・準備中" + countStr;
    case "Work":
      return minSecStr + "・作業中" + countStr;
    case "Rest":
      return minSecStr + "・リフレッシュ中" + countStr;
    default:
      return "ポモドーロタイマー"

  }
};