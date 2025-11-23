import { Stack, useLocalSearchParams } from 'expo-router';
import QuoteComparator from '../components/marketplace/QuoteComparator';

export default function QuoteComparatorScreen() {
  const params = useLocalSearchParams();
  const serviceId = parseInt(params.serviceId as string);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Comparar Cotizaciones',
          presentation: 'modal',
        }}
      />
      <QuoteComparator serviceId={serviceId} />
    </>
  );
}
