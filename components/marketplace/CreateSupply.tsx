import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

const categorias = [
  'Construcción',
  'Electricidad',
  'Plomería',
  'Pintura',
  'Jardinería',
  'Limpieza',
  'Oficina',
  'Otros',
];

export default function CreateSupply() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = () => {
    if (!state.currentUser) {
      Alert.alert('Error', 'Debes iniciar sesión');
      return;
    }

    if (!nombre.trim() || !descripcion.trim() || !categoria || !cantidad) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const cantidadNum = parseFloat(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      Alert.alert('Error', 'La cantidad debe ser un número válido mayor a 0');
      return;
    }

    const newSupply = {
      id: state.supplies.length + 1,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria: categoria,
      cantidad: cantidadNum,
      solicitanteId: state.currentUser.id,
      estado: 'ABIERTO',
    };

    dispatch({ type: 'ADD_SUPPLY', payload: newSupply });
    Alert.alert('Éxito', 'Solicitud de insumo creada correctamente');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Solicitar Insumos</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del insumo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Fertilizante orgánico"
              value={nombre}
              onChangeText={setNombre}
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoría *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {categorias.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    categoria === cat && styles.categoryButtonActive,
                  ]}
                  onPress={() => setCategoria(cat)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      categoria === cat && styles.categoryButtonTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe las características del insumo que necesitas..."
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cantidad *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 50"
              value={cantidad}
              onChangeText={setCantidad}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Crear Solicitud</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
    backgroundColor: '#007AFF',
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
