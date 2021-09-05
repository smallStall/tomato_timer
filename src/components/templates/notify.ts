import toast, { Toaster } from 'react-hot-toast';

export default function notifyMe(message: string) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    toast('デスクトップ通知が有効になっていません。有効にするには通知設定をご確認ください。', {
      icon: '🍅',
      duration: 6000,
      position: 'top-right',
    });
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

function pomodoroNotification (message:string){
  const notification = new Notification(
    'ポモドーロタイマー',
    {
      body:message,
      tag: 'pomodoro123',
    });  
}