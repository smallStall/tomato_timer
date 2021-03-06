export interface Sound{
  playSound: () => void;
  pauseSound: () => void;
  resumeSound: () => void;
  adjustSound: (position: number) => void;
  stopSound: () => void;
  playEnd: () => void;
}