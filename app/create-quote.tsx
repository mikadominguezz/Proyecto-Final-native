import CreateQuote from '@/components/marketplace/CreateQuote';
import { Stack } from 'expo-router';

export default function CreateQuoteScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Enviar Cotización',
          headerShown: true,
        }}
      />
      <CreateQuote />
    </>
  );
}
