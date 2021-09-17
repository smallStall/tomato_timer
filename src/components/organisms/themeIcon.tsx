import React, { useState, useEffect, Dispatch } from "react";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { IconButton} from "@material-ui/core";

type Props = {
  isDarkMode : boolean,
  setMode: (isDark:boolean) => void
} 

const ThemeIcon = ({isDarkMode, setMode}:Props) => {
  return (
    <>
      {isDarkMode ? (
        <IconButton color="inherit" onClick={() =>setMode(false)}>
          <Brightness7Icon />
        </IconButton>
      ) : (
        <IconButton color="inherit" onClick={() =>setMode(true)}>
          <Brightness4Icon />
        </IconButton>    
      )
    }</>
  )
}

export default ThemeIcon;