import { makeStyles, TextField } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";


const useStyles = makeStyles({
  textMemo:{
    marginTop: 40,
  },
})

type Prop = {
  pushMemo : string
  setPushMemo: Dispatch<SetStateAction<string>>
}

export const Memo: React.VFC<Prop> = ({pushMemo: defaultMessage, setPushMemo: setDefaultMessage}) => {
  const classes = useStyles();
  return(
    <TextField
      className={classes.textMemo}
      label="思い出しメモ"
      onChange={(event)=>{setDefaultMessage(event.target.value)}}
      value={defaultMessage}
      InputLabelProps={{
      }
    }
    fullWidth
    variant="outlined"
    />
  )
}

export default Memo;