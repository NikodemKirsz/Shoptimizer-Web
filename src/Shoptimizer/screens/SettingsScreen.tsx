import { Switch, SwitchChangeEvent, Text, View } from "react-native";
import { useStyles } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationData";
import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

function SettingsScreen(props: Props) {
  const {style, color} = useStyles();

  const {isDarkTheme, setIsDarkTheme} = useContext(ThemeContext);
  const [isDarkThemeInternal, setIsDarkThemeInternal] = useState<boolean>(isDarkTheme);

  const setDarkMode = useCallback((isDarkMode: boolean) => {
    setIsDarkThemeInternal(isDarkMode);
    setIsDarkTheme(isDarkMode);
  }, [setIsDarkTheme]);

  return (
    <View style={style.container}>
      <View style={style.card}>
        <View style={style.justifyCenter}>
          <Text style={style.text}>{"Ciemny motyw"}</Text>
        </View>
        <View>
          <Switch
            value={isDarkThemeInternal}
            onValueChange={setDarkMode}
          />
        </View>
      </View>
    </View>
  );
}

export default SettingsScreen;