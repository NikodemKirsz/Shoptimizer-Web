import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { GlobalTheme } from "../styles/Themes/Themes";
import getStyles from "../styles/Global.style";

function useStyles() {
  const theme = useTheme();
  const globalTheme = theme as GlobalTheme;

  const styles = useMemo(
    () => getStyles(globalTheme.colors), 
    [theme]
  );
  
  return {
    style: styles.style,
    color: styles.color
  };
}

export default useStyles;