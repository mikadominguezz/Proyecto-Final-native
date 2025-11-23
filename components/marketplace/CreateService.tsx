import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function CreateService() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Jardinería');
  const [ubicacion, setUbicacion] = useState('Montevideo');

  const categorias = [
    'Jardinería',
    'Plomería',
    'Electricidad',
    'Limpieza',
    'Construcción',
    'Pintura',
    'Carpintería',
    'Otros',
  ];

  const ubicaciones = [
    'Montevideo',
    'Salto',
    'Paysandú',
    'Las Piedras',
    'Rivera',
    'Maldonado',
    'Tacuarembó',
    'Melo',
    'Mercedes',
    'Artigas',
    'Minas',
    'San José de Mayo',
    'Durazno',
    'Florida',
    'Canelones',
    'Colonia del Sacramento',
    'Punta del Este',
    'Rocha',
    'Treinta y Tres',
  ];

  const handleSubmit = () => {
    if (!state.currentUser) {
      Alert.alert('Error', 'Debes iniciar sesión');
      return;
    }

    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const newService = {
      id: state.services.length + 1,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      categoria,
      ubicacion,
      estado: 'PENDIENTE',
      solicitanteId: state.currentUser.id,
    };

    dispatch({ type: 'ADD_SERVICE', payload: newService });
    Alert.alert('Éxito', 'Servicio creado correctamente');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crear Solicitud de Servicio</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Mantenimiento de jardín"
            value={titulo}
            onChangeText={setTitulo}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe detalladamente el servicio que necesitas..."
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
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
            </View>
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ubicación</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {ubicaciones.map((ubi) => (
                <TouchableOpacity
                  key={ubi}
                  style={[
                    styles.categoryButton,
                    ubicacion === ubi && styles.categoryButtonActive,
                  ]}
                  onPress={() => setUbicacion(ubi)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      ubicacion === ubi && styles.categoryButtonTextActive,
                    ]}
                  >
                    {ubi}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Crear Servicio</Text>
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
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
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
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: '600',
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
