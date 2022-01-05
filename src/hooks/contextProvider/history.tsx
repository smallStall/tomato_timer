import React, {
  useState,
} from "react";
import { historyContext } from "../useHistory";
import { CountAt } from "types/history"

type Props = { children: React.ReactNode };
export const HistoryProvider = ({ children }: Props) => {
  const [history, setHistory] = useState<Array<CountAt>>([]);
  return (
    <historyContext.Provider value={{ setHistory, history }}>
      {children}
    </historyContext.Provider>
  );
};