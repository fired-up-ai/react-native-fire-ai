import { Stack } from "expo-router";
import store  from "../store/store";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </PaperProvider>
    </ReduxProvider>
  );
}
