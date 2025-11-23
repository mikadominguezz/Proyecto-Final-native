import { Stack } from 'expo-router';
import CreateSupplyOffer from '../components/marketplace/CreateSupplyOffer';

export default function CreateSupplyOfferScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Enviar Oferta de Insumo',
          presentation: 'modal',
        }}
      />
      <CreateSupplyOffer />
    </>
  );
}
