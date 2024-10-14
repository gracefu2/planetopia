import 'react-native-gesture-handler';

// https://befonts.com/salisbury-bold-font.html
// https://befonts.com/goli-sans-font-family.html

import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { UserProvider } from './context/UserContext';
SplashScreen.preventAutoHideAsync();

export default function App() {
  // TODO: hide splash screen once fonts loaded

  const hideSplash = async () => {
    await SplashScreen.hideAsync()
  }

  return (
    <View style={{ flex: 1 }} onLayout={hideSplash}>
      <UserProvider>
        <StatusBar backgroundColor='auto' />
        <AppNavigator />
      </UserProvider>
    </View>
  );
}
