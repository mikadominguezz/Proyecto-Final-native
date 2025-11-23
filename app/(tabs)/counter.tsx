import { useApp } from '@/app/context/AppContext';
import MyQuotes from '@/components/marketplace/MyQuotes';
import SuppliesList from '@/components/marketplace/SuppliesList';
import { StyleSheet, Text, View } from 'react-native';

export default function CounterScreen() {
  const { state } = useApp();

  if (!state.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Por favor, inicia sesión</Text>
      </View>
    );
  }

  // Solicitante: Ver sus cotizaciones de servicios y sus insumos con ofertas
  if (state.currentUser.role === 'Solicitante') {
    return (
      <View style={styles.container}>
        <MyQuotes />
      </View>
    );
  }

  // Proveedor Servicio: Ver sus cotizaciones enviadas
  if (state.currentUser.role === 'Proveedor Servicio') {
    return (
      <View style={styles.container}>
        <MyQuotes />
      </View>
    );
  }

  // Proveedor Insumos: Ver insumos disponibles para cotizar
  if (state.currentUser.role === 'Proveedor Insumos') {
    return (
      <View style={styles.container}>
        <SuppliesList />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
