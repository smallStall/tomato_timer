import {
  useEffect,
  useCallback,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { History, CountAt, CountNum } from "../types/history";
const MAX_HISTORY_LENGTH = 24;
const RESET_STR = "リセット";

export const historyContext = createContext<{
  history: Array<CountAt>;
  setHistory: Dispatch<SetStateAction<Array<CountAt>>>;
}>({ history: new Array<CountAt>(), setHistory: () => { } });


const dateToHHMM = (date: Date) => {
  return (('0' + date.getHours()).slice(-2) +
         ":" +
         ('0' + date.getMinutes()).slice(-2))
}

export const useHistory = (): History => {
  const { history, setHistory } = useContext(historyContext);
  useEffect(() => {
    history.splice(0);
    const localHistory = localStorage.getItem('history')
    if (localHistory) {
      const json = JSON.parse(localHistory) as Array<CountAt>;
      json.forEach((countAt) => {
        history.push(countAt);
      })
    }
  }, [history])
  const add = useCallback(
    (count: CountNum) => {
      if (history.length > MAX_HISTORY_LENGTH) {
        history.shift();
      }
      let countStr: string;
      if (count != 'RESET') {
        countStr = (count + 1) + "コ"
      } else {
        countStr = RESET_STR
      }
      const nowMonth = (new Date()).getMonth() + 1;
      const nowDay = (new Date()).getDate();
      history.push({
        key: (new Date()).toString(),
        dateStr: dateToHHMM(new Date()),
        countStr: countStr,
        dayStr:  ('0' + nowMonth).slice(-2) + "/" + ('0' + nowDay).slice(-2),
        day: nowDay
      });
      const json = JSON.stringify(history, undefined, 1);
      localStorage.setItem('history', json);
    },
    [history]
  );

  const clear = useCallback(() => {
    setHistory([]);
    localStorage.setItem('history', "");
  }, [setHistory]);

  const get = useCallback(() => {
    return history;
  }, [history]);

  const restore = useCallback(() => {
    if (history.length > 0) {
      if (history[0].countStr === RESET_STR) {
        history.shift();
        const json = JSON.stringify(history, undefined, 1);
        localStorage.setItem('history', json);
      }
    }
  }, [history])

  return { addHistory: add, clearHistory: clear, getHistory: get, restoreHistory: restore };
};
