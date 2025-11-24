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
import SuppliesList from './SuppliesList';

export default function MyOffers() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'available' | 'myOffers'>('available');

  if (!state.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Por favor, inicia sesión</Text>
      </View>
    );
  }

  // Obtener ofertas enviadas por el proveedor actual
  const myOffers = state.supplyOffers.filter(
    (offer) => offer.proveedorId === state.currentUser!.id
  );

  if (activeTab === 'available') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, styles.tabActive]}
            onPress={() => setActiveTab('available')}
          >
            <Text style={[styles.tabText, styles.tabTextActive]}>Disponibles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('myOffers')}
          >
            <Text style={styles.tabText}>Mis Ofertas</Text>
          </TouchableOpacity>
        </View>
        <SuppliesList />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('available')}
        >
          <Text style={styles.tabText}>Disponibles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, styles.tabActive]}
          onPress={() => setActiveTab('myOffers')}
        >
          <Text style={[styles.tabText, styles.tabTextActive]}>Mis Ofertas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Mis Ofertas Enviadas</Text>
      </View>

      <ScrollView>
        {myOffers.length === 0 ? (
          <Text style={styles.emptyText}>
            No has enviado ninguna oferta todavía
          </Text>
        ) : (
          myOffers.map((offer) => {
            const supply = state.supplies.find((s) => s.id === offer.insumoId);
            if (!supply) return null;

            const solicitante = state.users.find(
              (u) => u.id === supply.solicitanteId
            );
            const isSelected = supply.ofertaSeleccionadaId === offer.id;
            const pricePerUnit = offer.precio / supply.cantidad;

            return (
              <View key={offer.id} style={styles.offerSection}>
                <View style={styles.supplyHeader}>
                  <Text style={styles.supplyName}>{supply.nombre}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      offer.estado === 'ACEPTADA'
                        ? styles.statusAccepted
                        : styles.statusPending,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {offer.estado === 'ACEPTADA' ? 'Aceptada' : 'Pendiente'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.supplyDescription}>
                  {supply.descripcion}
                </Text>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Solicitante:</Text>
                  <Text style={styles.value}>👤 {solicitante?.nombre}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Cantidad:</Text>
                  <Text style={styles.value}>{supply.cantidad} unidades</Text>
                </View>

                <View style={styles.priceSection}>
                  <View>
                    <Text style={styles.priceLabel}>Tu Oferta:</Text>
                    <Text style={styles.priceValue}>
                      ${offer.precio.toLocaleString()}
                    </Text>
                    <Text style={styles.unitPrice}>
                      ${pricePerUnit.toFixed(2)} por unidad
                    </Text>
                  </View>

                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedText}>✓ Seleccionada</Text>
                    </View>
                  )}
                </View>

                {isSelected && (
                  <View style={styles.successAlert}>
                    <Text style={styles.successIcon}>🎉</Text>
                    <Text style={styles.successText}>
                      ¡Felicidades! Tu oferta fue seleccionada
                    </Text>
                  </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FF9800',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FF9800',
    fontWeight: '600',
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
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    padding: 20,
  },
  offerSection: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supplyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  supplyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#FFC107',
  },
  statusAccepted: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  supplyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  unitPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  selectedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  selectedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  successAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  successIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  successText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
    flex: 1,
  },
});
