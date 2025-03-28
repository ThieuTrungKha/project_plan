import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SplasScreen } from "./src/screens";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppRouter from "./src/screens/navigators/AppRouter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsShowSplash(false), 1000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <StatusBar style="dark" translucent />
      <Provider store={store}>
        {isShowSplash ? (
          <SplasScreen />
        ) : (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <AppRouter />
            </NavigationContainer>
          </GestureHandlerRootView>
        )}
      </Provider>
    </>
  );
};

export default App;
