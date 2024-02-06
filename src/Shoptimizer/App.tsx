import { LogBox } from 'react-native';
import { enableScreens } from "react-native-screens";
import { registerExtensions } from "./logic/extensions";
import { ThemeProvider } from "./contexts/ThemeContext";
import Main from "./screens/Main";


LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "(imported as 'Animated') was not found in 'react-native-reanimated'",
  "StyleSheet.compose(a, b) is deprecated; use array syntax, i.e., [a,b]"
]);

registerExtensions();
enableScreens();

export default function App() {
  return (
    <ThemeProvider>
      <Main/>
    </ThemeProvider>
  );
}
