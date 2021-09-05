import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('デスクトップ通知が有効になっていません。有効にするには通知設定をご確認ください。', {
  icon: '🍅',
  duration: 8000,
  position: 'top-right',
});

const Toast = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};

export default Toast;