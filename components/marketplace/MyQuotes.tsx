import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function MyQuotes() {
  const { state } = useApp();

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Cotizaciones</Text>
      </View>

      {myServices.map((service) => {
        const quotes = state.quotes.filter((q) => q.servicioId === service.id);

        return (
          <View key={service.id} style={styles.serviceSection}>
            <Text style={styles.serviceTitle}>{service.titulo}</Text>
            <Text style={styles.serviceStatus}>Estado: {service.estado}</Text>

            {quotes.length === 0 ? (
              <Text style={styles.noQuotes}>
                No hay cotizaciones para este servicio
              </Text>
            ) : (
              quotes.map((quote) => {
                const provider = state.users.find(
                  (u) => u.id === quote.proveedorId
                );
                const isSelected =
                  service.cotizacionSeleccionadaId === quote.id;

                return (
                  <View
                    key={quote.id}
                    style={[
                      styles.quoteCard,
                      isSelected && styles.selectedQuote,
                    ]}
                  >
                    <View style={styles.quoteHeader}>
                      <Text style={styles.providerName}>
                        {provider?.nombre}
                      </Text>
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
                            : styles.statusPending,
                        ]}
                      >
                        <Text style={styles.statusText}>{quote.estado}</Text>
                      </View>
                    </View>
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
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
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
  quoteDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
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
  statusPending: {
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
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    padding: 20,
  },
});
