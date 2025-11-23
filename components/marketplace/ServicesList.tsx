import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function ServicesList() {
  const { state } = useApp();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedLocation, setSelectedLocation] = useState('Todas');

  const categorias = [
    'Todas',
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
    'Todas',
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

  const filteredServices = state.services.filter(
    (service) =>
      service.estado === 'PENDIENTE' &&
      (selectedCategory === 'Todas' || service.categoria === selectedCategory) &&
      (selectedLocation === 'Todas' || service.ubicacion === selectedLocation)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicios Disponibles</Text>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Categoría:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersContainer}>
              {categorias.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterButton,
                    selectedCategory === cat && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCategory === cat && styles.filterButtonTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Ubicación:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersContainer}>
              {ubicaciones.map((ubi) => (
                <TouchableOpacity
                  key={ubi}
                  style={[
                    styles.filterButton,
                    selectedLocation === ubi && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedLocation(ubi)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedLocation === ubi && styles.filterButtonTextActive,
                    ]}
                  >
                    {ubi}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
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

                <Text style={styles.serviceLocation}>
                  📍 {service.ubicacion}
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
                    onPress={() => router.push(`/create-quote?serviceId=${service.id}`)}
                  >
                    <Text style={styles.quoteButtonText}>Enviar Cotización</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
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
  filterSection: {
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  filterButtonTextActive: {
    color: 'white',
    fontWeight: '600',
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
  serviceLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
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
