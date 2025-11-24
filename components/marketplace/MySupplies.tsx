import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useApp } from '../../app/context/AppContext';
import SuppliesList from './SuppliesList';

export default function MySupplies() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'available' | 'mine'>('available');

  const handleSelectOffer = (supplyId: number, offerId: number) => {
    Alert.alert(
      'Seleccionar Oferta',
      '¿Estás seguro de que deseas seleccionar esta oferta de insumo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            // Actualizar estado del insumo a CERRADO
            const supply = state.supplies.find((s) => s.id === supplyId);
            if (supply) {
              dispatch({
                type: 'UPDATE_SUPPLY',
                payload: { ...supply, estado: 'CERRADO', ofertaSeleccionadaId: offerId },
              });
            }
            // Actualizar estado de la oferta a ACEPTADA
            const offer = state.supplyOffers.find((o) => o.id === offerId);
            if (offer) {
              dispatch({
                type: 'UPDATE_SUPPLY_OFFER',
                payload: { ...offer, estado: 'ACEPTADA' },
              });
            }
            Alert.alert('Éxito', 'Oferta de insumo seleccionada correctamente');
          },
        },
      ]
    );
  };

  if (!state.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Por favor, inicia sesión</Text>
      </View>
    );
  }

  const mySupplies = state.supplies.filter(
    (s) => s.solicitanteId === state.currentUser!.id
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
            onPress={() => setActiveTab('mine')}
          >
            <Text style={styles.tabText}>Mis Solicitudes</Text>
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
          onPress={() => setActiveTab('mine')}
        >
          <Text style={[styles.tabText, styles.tabTextActive]}>Mis Solicitudes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Mis Solicitudes de Insumos</Text>
      </View>

      <ScrollView>
        {mySupplies.map((supply) => {
        const offers = state.supplyOffers.filter((o) => o.insumoId === supply.id);

        return (
          <View key={supply.id} style={styles.supplySection}>
            <View style={styles.supplyHeader}>
              <Text style={styles.supplyName}>{supply.nombre}</Text>
              <View
                style={[
                  styles.statusBadge,
                  supply.estado === 'ABIERTO'
                    ? styles.statusOpen
                    : styles.statusClosed,
                ]}
              >
                <Text style={styles.statusText}>{supply.estado}</Text>
              </View>
            </View>

            <Text style={styles.supplyDescription}>{supply.descripcion}</Text>
            <Text style={styles.supplyQuantity}>
              Cantidad: {supply.cantidad} unidades
            </Text>

            <Text style={styles.offersTitle}>
              Ofertas recibidas ({offers.length}):
            </Text>

            {offers.length === 0 ? (
              <Text style={styles.noOffers}>
                No hay ofertas para este insumo todavía
              </Text>
            ) : (
              offers.map((offer) => {
                const provider = state.users.find(
                  (u) => u.id === offer.proveedorId
                );
                const isSelected = supply.ofertaSeleccionadaId === offer.id;
                const pricePerUnit = offer.precio / supply.cantidad;

                return (
                  <View
                    key={offer.id}
                    style={[
                      styles.offerCard,
                      isSelected && styles.selectedOffer,
                    ]}
                  >
                    <View style={styles.offerHeader}>
                      <Text style={styles.providerName}>
                        🏪 {provider?.nombre}
                      </Text>
                      {isSelected && (
                        <View style={styles.selectedBadge}>
                          <Text style={styles.selectedText}>✓ Seleccionada</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.priceContainer}>
                      <View>
                        <Text style={styles.totalPrice}>
                          ${offer.precio.toLocaleString()}
                        </Text>
                        <Text style={styles.unitPrice}>
                          ${pricePerUnit.toFixed(2)} por unidad
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.offerStatusBadge,
                          offer.estado === 'ACEPTADA'
                            ? styles.offerAccepted
                            : styles.offerPending,
                        ]}
                      >
                        <Text style={styles.offerStatusText}>
                          {offer.estado}
                        </Text>
                      </View>
                    </View>

                    {!isSelected && supply.estado === 'ABIERTO' && (
                      <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => handleSelectOffer(supply.id, offer.id)}
                      >
                        <Text style={styles.selectButtonText}>
                          Seleccionar esta oferta
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            )}
          </View>
        );
      })}

        {mySupplies.length === 0 && (
          <Text style={styles.emptyText}>
            No has solicitado ningún insumo todavía
          </Text>
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
  supplySection: {
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
  statusOpen: {
    backgroundColor: '#4CAF50',
  },
  statusClosed: {
    backgroundColor: '#9E9E9E',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  supplyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  supplyQuantity: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 12,
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  noOffers: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
  offerCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  selectedOffer: {
    borderLeftColor: '#28A745',
    backgroundColor: '#e8f5e9',
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedBadge: {
    backgroundColor: '#28A745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  unitPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  offerStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offerPending: {
    backgroundColor: '#FFF3CD',
  },
  offerAccepted: {
    backgroundColor: '#D1ECF1',
  },
  offerStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    padding: 20,
  },
});
