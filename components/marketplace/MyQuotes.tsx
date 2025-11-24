import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function MyQuotes() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleSelectQuote = (serviceId: number, quoteId: number) => {
    Alert.alert(
      'Seleccionar Cotización',
      '¿Estás seguro de que deseas seleccionar esta cotización?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch({ type: 'SELECT_QUOTE', payload: { serviceId, quoteId } });
            dispatch({
              type: 'UPDATE_QUOTE',
              payload: {
                ...state.quotes.find((q) => q.id === quoteId)!,
                estado: 'ACEPTADA',
              },
            });
            Alert.alert('Éxito', 'Cotización seleccionada correctamente');
          },
        },
      ]
    );
  };

  const handleChangeServiceState = (serviceId: number, newState: string) => {
    const service = state.services.find((s) => s.id === serviceId);
    if (!service) return;

    let confirmMessage = '';
    switch (newState) {
      case 'EN_PROCESO':
        confirmMessage = '¿Confirmar que el servicio está en proceso?';
        break;
      case 'COMPLETADO':
        confirmMessage = '¿Confirmar que el servicio está completado?';
        break;
      case 'CANCELADO':
        confirmMessage = '¿Confirmar que deseas cancelar el servicio?';
        break;
    }

    Alert.alert('Cambiar Estado', confirmMessage, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: () => {
          dispatch({
            type: 'UPDATE_SERVICE',
            payload: { ...service, estado: newState },
          });
          Alert.alert('Éxito', 'Estado del servicio actualizado');

          if (newState === 'COMPLETADO') {
            setSelectedService(serviceId);
            setRatingModalVisible(true);
          }
        },
      },
    ]);
  };

  const handleRateProvider = (rating: number) => {
    if (!selectedService) return;

    const service = state.services.find((s) => s.id === selectedService);
    if (!service || !service.proveedorAsignadoId) return;

    const provider = state.users.find((u) => u.id === service.proveedorAsignadoId);
    if (!provider) return;

    const currentRating = provider.rating || 0;
    const currentTotal = provider.totalRatings || 0;
    const newTotal = currentTotal + 1;
    const newRating = (currentRating * currentTotal + rating) / newTotal;

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        ...provider,
        rating: newRating,
        totalRatings: newTotal,
      },
    });

    setRatingModalVisible(false);
    setSelectedService(null);
    Alert.alert('Éxito', 'Gracias por tu calificación');
  };

  if (!state.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Por favor, inicia sesión</Text>
      </View>
    );
  }

  const myServices = state.services.filter(
    (s) => s.solicitanteId === state.currentUser!.id
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Servicios</Text>
      </View>

      <ScrollView>
        {myServices.map((service) => {
        const quotes = state.quotes.filter((q) => q.servicioId === service.id);
        const provider = service.proveedorAsignadoId
          ? state.users.find((u) => u.id === service.proveedorAsignadoId)
          : null;

        return (
          <View key={service.id} style={styles.serviceSection}>
            <View style={styles.serviceSectionHeader}>
              <Text style={styles.serviceTitle}>{service.titulo}</Text>
              <View
                style={[
                  styles.statusBadgeService,
                  service.estado === 'PENDIENTE' && styles.statusPending,
                  service.estado === 'ASIGNADO' && styles.statusAssigned,
                  service.estado === 'EN_PROCESO' && styles.statusInProgress,
                  service.estado === 'COMPLETADO' && styles.statusCompleted,
                  service.estado === 'CANCELADO' && styles.statusCanceled,
                ]}
              >
                <Text style={styles.statusServiceText}>
                  {service.estado === 'EN_PROCESO' ? 'En Proceso' : service.estado.charAt(0) + service.estado.slice(1).toLowerCase()}
                </Text>
              </View>
            </View>

            {provider && (
              <View style={styles.providerInfo}>
                <Text style={styles.providerLabel}>Proveedor asignado:</Text>
                <Text style={styles.providerName}>�� {provider.nombre}</Text>
                {provider.rating && provider.rating > 0 ? (
                  <Text style={styles.providerRating}>
                    ⭐ {provider.rating.toFixed(1)} ({provider.totalRatings} calificaciones)
                  </Text>
                ) : null}
              </View>
            )}

            {service.estado === 'ASIGNADO' && (
              <View style={styles.stateButtonsContainer}>
                <TouchableOpacity
                  style={[styles.stateButton, styles.stateButtonInProgress]}
                  onPress={() => handleChangeServiceState(service.id, 'EN_PROCESO')}
                >
                  <Text style={styles.stateButtonText}>Iniciar Servicio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.stateButton, styles.stateButtonCancel]}
                  onPress={() => handleChangeServiceState(service.id, 'CANCELADO')}
                >
                  <Text style={styles.stateButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}

            {service.estado === 'EN_PROCESO' && (
              <View style={styles.stateButtonsContainer}>
                <TouchableOpacity
                  style={[styles.stateButton, styles.stateButtonComplete]}
                  onPress={() => handleChangeServiceState(service.id, 'COMPLETADO')}
                >
                  <Text style={styles.stateButtonText}>Marcar como Completado</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.quotesHeader}>
              <Text style={styles.quotesTitle}>
                Cotizaciones ({quotes.length}):
              </Text>
              {quotes.length > 0 && service.estado === 'PENDIENTE' && (
                <TouchableOpacity
                  style={styles.compareButton}
                  onPress={() => router.push(`/compare-quotes?serviceId=${service.id}`)}
                >
                  <Text style={styles.compareButtonText}>
                    {quotes.length === 1 ? 'Ver Cotización' : 'Comparar'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {quotes.length === 0 ? (
              <Text style={styles.noQuotes}>
                No hay cotizaciones para este servicio
              </Text>
            ) : (
              quotes.map((quote) => {
                const quoteProvider = state.users.find(
                  (u) => u.id === quote.proveedorId
                );
                const isSelected = service.cotizacionSeleccionadaId === quote.id;

                return (
                  <View
                    key={quote.id}
                    style={[
                      styles.quoteCard,
                      isSelected && styles.selectedQuote,
                    ]}
                  >
                    <View style={styles.quoteHeader}>
                      <View>
                        <Text style={styles.providerNameQuote}>
                          {quoteProvider?.nombre}
                        </Text>
                        {quoteProvider?.rating && quoteProvider.rating > 0 ? (
                          <Text style={styles.providerRatingSmall}>
                            ⭐ {quoteProvider.rating.toFixed(1)}
                          </Text>
                        ) : null}
                      </View>
                      {isSelected && (
                        <View style={styles.selectedBadge}>
                          <Text style={styles.selectedText}>✓ Seleccionada</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.quoteDescription}>
                      {quote.descripcion}
                    </Text>

                    <View style={styles.quoteFooter}>
                      <Text style={styles.amount}>
                        ${quote.monto.toLocaleString()}
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          quote.estado === 'ACEPTADA'
                            ? styles.statusAccepted
                            : styles.statusPendingQuote,
                        ]}
                      >
                        <Text style={styles.statusText}>{quote.estado}</Text>
                      </View>
                    </View>

                    {!isSelected && service.estado === 'PENDIENTE' && (
                      <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => handleSelectQuote(service.id, quote.id)}
                      >
                        <Text style={styles.selectButtonText}>
                          Seleccionar esta cotización
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

        {myServices.length === 0 && (
          <Text style={styles.emptyText}>
            No has creado ningún servicio todavía
          </Text>
        )}
      </ScrollView>

      <Modal
        visible={ratingModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Califica al Proveedor</Text>
            <Text style={styles.modalSubtitle}>
              ¿Cómo fue tu experiencia con este servicio?
            </Text>

            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  style={styles.starButton}
                  onPress={() => handleRateProvider(star)}
                >
                  <Text style={styles.starText}>⭐</Text>
                  <Text style={styles.starLabel}>{star}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setRatingModalVisible(false);
                setSelectedService(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  serviceSection: {
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
  serviceSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadgeService: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#FFC107',
  },
  statusAssigned: {
    backgroundColor: '#2196F3',
  },
  statusInProgress: {
    backgroundColor: '#FF9800',
  },
  statusCompleted: {
    backgroundColor: '#4CAF50',
  },
  statusCanceled: {
    backgroundColor: '#F44336',
  },
  statusServiceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  providerInfo: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  providerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  providerRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  providerRatingSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  stateButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  stateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  stateButtonInProgress: {
    backgroundColor: '#FF9800',
  },
  stateButtonComplete: {
    backgroundColor: '#4CAF50',
  },
  stateButtonCancel: {
    backgroundColor: '#F44336',
  },
  stateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  quotesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quotesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  compareButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  compareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  noQuotes: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
  quoteCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  selectedQuote: {
    borderLeftColor: '#28A745',
    backgroundColor: '#e8f5e9',
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  providerNameQuote: {
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
  quoteDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28A745',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPendingQuote: {
    backgroundColor: '#FFF3CD',
  },
  statusAccepted: {
    backgroundColor: '#D1ECF1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#007AFF',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  starButton: {
    alignItems: 'center',
  },
  starText: {
    fontSize: 36,
  },
  starLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#666',
  },
});
