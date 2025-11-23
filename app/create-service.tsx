import CreateService from '@/components/marketplace/CreateService';
import { Stack } from 'expo-router';

export default function CreateServiceScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Crear Servicio',
          headerShown: true,
        }}
      />
      <CreateService />
    </>
  );
}
