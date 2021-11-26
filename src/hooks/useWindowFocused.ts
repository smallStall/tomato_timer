import { useEffect, useState } from "react";

//import { WindowFocusContext } from "../../pages/theme";


export const useWindowFocused = () => {
  const [isFocused, setIsFocused] = useState(true);
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });
  return {isFocused: isFocused};
};

