import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
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

export default function CreateSupplyOffer() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const params = useLocalSearchParams();
  const supplyId = params.supplyId ? Number(params.supplyId) : null;

  const [precio, setPrecio] = useState('');

  const supply = state.supplies.find((s) => s.id === supplyId);

  const handleSubmit = () => {
    if (!state.currentUser) {
      Alert.alert('Error', 'Debes iniciar sesión');
      return;
    }

    if (!precio) {
      Alert.alert('Error', 'Por favor ingresa el precio');
      return;
    }

    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor a 0');
      return;
    }

    const newOffer = {
      id: state.supplyOffers.length + 1,
      insumoId: supplyId!,
      proveedorId: state.currentUser.id,
      precio: precioNum,
      estado: 'PENDIENTE',
    };

    dispatch({ type: 'ADD_SUPPLY_OFFER', payload: newOffer });
    Alert.alert('Éxito', 'Oferta enviada correctamente');
    router.back();
  };

  if (!supply) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Solicitud de insumo no encontrada</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enviar Oferta de Insumo</Text>

        <View style={styles.supplyInfo}>
          <Text style={styles.supplyName}>{supply.nombre}</Text>
          <Text style={styles.supplyDescription}>{supply.descripcion}</Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>
              Cantidad solicitada: {supply.cantidad}
            </Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Precio total por {supply.cantidad} unidades *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 35000"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Text style={styles.hint}>
            Precio por unidad: ${precio ? (parseFloat(precio) / supply.cantidad).toFixed(2) : '0.00'}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📋 Información importante:</Text>
          <Text style={styles.infoText}>
            • El precio debe incluir todos los costos (envío, impuestos, etc.){'\n'}
            • El solicitante podrá comparar tu oferta con otras{'\n'}
            • Solo se puede seleccionar una oferta ganadora{'\n'}
            • Asegúrate de poder cumplir con la cantidad solicitada
          </Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Oferta</Text>
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
  supplyInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  supplyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  supplyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  quantityBadge: {
    backgroundColor: '#28A745',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  quantityText: {
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
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#FF9800',
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
