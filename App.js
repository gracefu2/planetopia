import 'react-native-gesture-handler';

// https://befonts.com/salisbury-bold-font.html
// https://befonts.com/goli-sans-font-family.html

import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { UserProvider } from './context/UserContext';
import { useCallback, useEffect, useState } from 'react';

import { Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold } from "@expo-google-fonts/poppins"

SplashScreen.preventAutoHideAsync();

const customFontsToLoad = {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFontsToLoad);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserProvider>
        <StatusBar backgroundColor='auto' />
        <AppNavigator />
      </UserProvider>
    </View>
  );
}
