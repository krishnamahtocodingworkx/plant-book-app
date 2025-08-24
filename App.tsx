import "react-native-gesture-handler";
import "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./routes/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ToastManager from "toastify-react-native";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
        <ToastManager />
      </PersistGate>
    </Provider>
  );
}
