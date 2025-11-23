import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppProvider } from './context/AppContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="create-service" options={{ presentation: 'modal', title: 'Crear Servicio' }} />
          <Stack.Screen name="create-quote" options={{ presentation: 'modal', title: 'Enviar Cotización' }} />
          <Stack.Screen name="create-supply" options={{ presentation: 'modal', title: 'Solicitar Insumos' }} />
          <Stack.Screen name="create-supply-offer" options={{ presentation: 'modal', title: 'Enviar Oferta de Insumo' }} />
          <Stack.Screen name="compare-quotes" options={{ presentation: 'modal', title: 'Comparar Cotizaciones' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
