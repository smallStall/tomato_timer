export type CountAt = {
  dateStr: string;
  countStr: string;
  dayStr: string;
  day: number;
  key: string;
}
export interface History{
  addHistory: (count : CountNum) => void,
  clearHistory: () => void,
  getHistory: () => Array<CountAt>,
  restoreHistory: () => void,
}

export type CountNum = number | 'RESET';
