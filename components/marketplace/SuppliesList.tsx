import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

const categorias = [
  'Todas',
  'Construcción',
  'Electricidad',
  'Plomería',
  'Pintura',
  'Jardinería',
  'Limpieza',
  'Oficina',
  'Otros',
];

export default function SuppliesList() {
  const { state } = useApp();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredSupplies = state.supplies.filter(
    (supply) =>
      supply.estado === 'ABIERTO' &&
      (selectedCategory === 'Todas' || supply.categoria === selectedCategory)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insumos Solicitados</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterSection}
        >
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
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {filteredSupplies.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay solicitudes de insumos disponibles en este momento
          </Text>
        ) : (
          filteredSupplies.map((supply) => {
            const offersCount = state.supplyOffers.filter(
              (o) => o.insumoId === supply.id
            ).length;
            const solicitante = state.users.find(
              (u) => u.id === supply.solicitanteId
            );

            return (
              <View key={supply.id} style={styles.supplyCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.supplyName}>{supply.nombre}</Text>
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>
                      {supply.cantidad} unidades
                    </Text>
                  </View>
                </View>

                <Text style={styles.supplyDescription}>
                  {supply.descripcion}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.solicitante}>
                    👤 {solicitante?.nombre}
                  </Text>
                  <Text style={styles.offersCount}>
                    {offersCount} oferta{offersCount !== 1 ? 's' : ''}
                  </Text>
                </View>

                {state.currentUser?.role === 'Proveedor Insumos' && (
                  <TouchableOpacity
                    style={styles.offerButton}
                    onPress={() => router.push(`/create-supply-offer?supplyId=${supply.id}`)}
                  >
                    <Text style={styles.offerButtonText}>Enviar Oferta</Text>
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
    maxHeight: 50,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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
  supplyCard: {
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
  supplyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  quantityBadge: {
    backgroundColor: '#28A745',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  quantityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  supplyDescription: {
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
  offersCount: {
    fontSize: 12,
    color: '#999',
  },
  offerButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  offerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
