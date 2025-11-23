import CreateSupply from '@/components/marketplace/CreateSupply';
import { Stack } from 'expo-router';

export default function CreateSupplyScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Solicitar Insumos',
          headerShown: true,
        }}
      />
      <CreateSupply />
    </>
  );
}
