import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import DriversContextProvider from '../contexts/DriversContext';
import Header from '../components/Header';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return !loaded ? <SplashScreen /> : <RootLayoutNav />
}

const RootLayoutNav = () => {
  return (
    <NativeBaseProvider>
      <DriversContextProvider>
        <Stack initialRouteName='index'>
          <Stack.Screen name="index" options={{ header: (props) => <Header {...props} /> }} />
          <Stack.Screen name="add" options={{ headerTitle: "Add Driver"}} />
          <Stack.Screen name="search" options={{ headerTitle: "Search Driver"}} />
        </Stack>
      </DriversContextProvider>
    </NativeBaseProvider>
  );
}