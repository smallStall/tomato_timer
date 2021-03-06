import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useHistory } from "hooks/useHistory";
import { useMobileWindow } from "hooks/useMobileWindow";
import { CountAt } from "types/history";
import styles from "./historyDialog.module.scss";

const MAX_HISTORY_ROW = 5; //モバイルなら折り返さないように設定

type Props = {
  open: boolean;
  onClose: (isOk: boolean) => void;
};

export const HistoryDialog: React.VFC<Props> = ({ open, onClose }) => {
  const { getHistory } = useHistory();
  const [history] = useState(getHistory());
  const [maxHistoryRow, setMaxHistoryRow] = useState(MAX_HISTORY_ROW);
  const { isMobile } = useMobileWindow();
  useEffect(() => {
    setMaxHistoryRow(isMobile ? MAX_HISTORY_ROW * 5 : MAX_HISTORY_ROW);
  }, [isMobile]);
  const leftHistoryLength = Math.floor(history.length / 2);
  let prevDayStr = "";
  const getListItem = (
    { key, dateStr, countStr, dayStr }: CountAt,
    index: number
  ) => {
    let isSameDay = true;
    if (prevDayStr != dayStr) {
      prevDayStr = dayStr;
      isSameDay = false;
    }
    return (
      <TableRow className={styles.rows} key={key}>
        <TableCell className={styles.cell}>
          {isSameDay && index !== 0 ? "" : dayStr}
        </TableCell>
        <TableCell className={styles.cell}>{dateStr}</TableCell>
        <TableCell className={styles.cell}>{countStr}</TableCell>
      </TableRow>
    );
  };
  const getList = (historyItems: Array<CountAt>) => {
    return (
      <Table className={styles.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell className={styles.cell} />
            <TableCell className={styles.cell} />
            <TableCell className={styles.cell} />
          </TableRow>
        </TableHead>
        <TableBody>{historyItems.map(getListItem)}</TableBody>
      </Table>
    );
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby="トマト履歴"
      aria-describedby="トマトを何個取ったかの履歴"
      maxWidth="lg"
    >
      <DialogTitle>トマト履歴</DialogTitle>
      <TableContainer className={styles.tables}>
        {leftHistoryLength < maxHistoryRow
          ? getList(history)
          : getList(history.slice(0, leftHistoryLength))}
        {leftHistoryLength < maxHistoryRow ? (
          <></>
        ) : (
          getList(history.slice(leftHistoryLength + 1, history.length))
        )}
      </TableContainer>
      <DialogActions>
        <Button
          onClick={() => {
            onClose(false);
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
