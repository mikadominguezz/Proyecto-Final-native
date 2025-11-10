import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function ServicesList() {
  const { state } = useApp();
  const [filter, setFilter] = useState('');

  const filteredServices = state.services.filter(
    (service) =>
      service.estado === 'PENDIENTE' &&
      (service.titulo.toLowerCase().includes(filter.toLowerCase()) ||
        service.categoria.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicios Disponibles</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicios..."
          value={filter}
          onChangeText={setFilter}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredServices.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay servicios disponibles en este momento
          </Text>
        ) : (
          filteredServices.map((service) => {
            const quotesCount = state.quotes.filter(
              (q) => q.servicioId === service.id
            ).length;
            const solicitante = state.users.find(
              (u) => u.id === service.solicitanteId
            );

            return (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.serviceTitle}>{service.titulo}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {service.categoria}
                    </Text>
                  </View>
                </View>

                <Text style={styles.serviceDescription}>
                  {service.descripcion}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.solicitante}>
                    👤 {solicitante?.nombre}
                  </Text>
                  <Text style={styles.quotesCount}>
                    {quotesCount} cotización{quotesCount !== 1 ? 'es' : ''}
                  </Text>
                </View>

                {state.currentUser?.role === 'Proveedor Servicio' && (
                  <TouchableOpacity
                    style={styles.quoteButton}
                    onPress={() =>
                      Alert.alert(
                        'Enviar Cotización',
                        `Servicio: ${service.titulo}\nFuncionalidad en desarrollo`
                      )
                    }
                  >
                    <Text style={styles.quoteButtonText}>Enviar Cotización</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  solicitante: {
    fontSize: 14,
    color: '#666',
  },
  quotesCount: {
    fontSize: 12,
    color: '#999',
  },
  quoteButton: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  quoteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
