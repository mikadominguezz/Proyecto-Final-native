import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function CreateQuote() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceId = params.serviceId ? Number(params.serviceId) : null;

  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const service = state.services.find((s) => s.id === serviceId);

  const handleSubmit = () => {
    if (!state.currentUser) {
      Alert.alert('Error', 'Debes iniciar sesión');
      return;
    }

    if (!monto || !descripcion.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Error', 'El monto debe ser un número válido mayor a 0');
      return;
    }

    const newQuote = {
      id: state.quotes.length + 1,
      servicioId: serviceId!,
      proveedorId: state.currentUser.id,
      monto: montoNum,
      descripcion: descripcion.trim(),
      estado: 'PENDIENTE',
    };

    dispatch({ type: 'ADD_QUOTE', payload: newQuote });
    Alert.alert('Éxito', 'Cotización enviada correctamente');
    router.back();
  };

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Servicio no encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enviar Cotización</Text>

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.titulo}</Text>
          <Text style={styles.serviceDescription}>{service.descripcion}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{service.categoria}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto a cobrar *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 15000"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción de la cotización *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalla qué incluye tu servicio, plazos de entrega, materiales, etc."
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Cotización</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  serviceInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
