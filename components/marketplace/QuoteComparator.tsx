import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

interface QuoteComparatorProps {
  serviceId: number;
}

export default function QuoteComparator({ serviceId }: QuoteComparatorProps) {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');

  const service = state.services.find((s) => s.id === serviceId);
  const quotes = state.quotes.filter((q) => q.servicioId === serviceId);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Servicio no encontrado</Text>
      </View>
    );
  }

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortBy === 'price') {
      return a.monto - b.monto;
    } else {
      const providerA = state.users.find((u) => u.id === a.proveedorId);
      const providerB = state.users.find((u) => u.id === b.proveedorId);
      return (providerB?.rating || 0) - (providerA?.rating || 0);
    }
  });

  const handleSelectQuote = (quoteId: number) => {
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
            router.back();
          },
        },
      ]
    );
  };

  if (quotes.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Comparar Cotizaciones</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💰</Text>
          <Text style={styles.emptyTitle}>No hay cotizaciones</Text>
          <Text style={styles.emptyText}>
            Aún no has recibido cotizaciones para este servicio
          </Text>
        </View>
      </View>
    );
  }

  const bestPrice = Math.min(...quotes.map((q) => q.monto));
  const avgRating =
    quotes.reduce((sum, q) => {
      const provider = state.users.find((u) => u.id === q.proveedorId);
      return sum + (provider?.rating || 0);
    }, 0) / quotes.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {quotes.length === 1 ? 'Cotización Recibida' : 'Comparar Cotizaciones'}
        </Text>
        <Text style={styles.subtitle}>{service.titulo}</Text>
      </View>

      {quotes.length === 1 && (
        <View style={styles.singleQuoteAlert}>
          <Text style={styles.alertIcon}>✓</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>¿Aceptar esta cotización?</Text>
            <Text style={styles.alertText}>
              Has recibido una cotización. Puedes aceptarla directamente haciendo clic
              en &quot;Seleccionar&quot; más abajo.
            </Text>
          </View>
        </View>
      )}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumen</Text>
        <Text style={styles.summarySubtitle}>
          {quotes.length === 1
            ? '1 cotización recibida'
            : `${quotes.length} cotizaciones recibidas`}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>💵</Text>
            <Text style={styles.statLabel}>Mejor Precio</Text>
            <Text style={styles.statValue}>${bestPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statLabel}>Rating Promedio</Text>
            <Text style={styles.statValue}>{avgRating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Ordenar por:</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'price' && styles.sortButtonActive]}
            onPress={() => setSortBy('price')}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === 'price' && styles.sortButtonTextActive,
              ]}
            >
              Precio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'rating' && styles.sortButtonActive]}
            onPress={() => setSortBy('rating')}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === 'rating' && styles.sortButtonTextActive,
              ]}
            >
              Rating
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quotesContainer}>
        {sortedQuotes.map((quote, index) => {
          const provider = state.users.find((u) => u.id === quote.proveedorId);
          const isBestPrice = quote.monto === bestPrice;
          const isBestRating =
            provider?.rating ===
            Math.max(...quotes.map((q) => {
              const p = state.users.find((u) => u.id === q.proveedorId);
              return p?.rating || 0;
            }));

          return (
            <View key={quote.id} style={styles.quoteCard}>
              <View style={styles.quoteHeader}>
                <View style={styles.quoteHeaderLeft}>
                  <Text style={styles.providerName}>{provider?.nombre}</Text>
                  {provider?.rating && provider.rating > 0 ? (
                    <Text style={styles.providerRating}>
                      ⭐ {provider.rating.toFixed(1)} ({provider.totalRatings}{' '}
                      calificaciones)
                    </Text>
                  ) : (
                    <Text style={styles.providerRating}>Sin calificaciones</Text>
                  )}
                </View>
                {index === 0 && quotes.length > 1 && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recomendado</Text>
                  </View>
                )}
              </View>

              <Text style={styles.quoteDescription}>{quote.descripcion}</Text>

              <View style={styles.quoteDetailsContainer}>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Precio Total</Text>
                  <Text style={styles.priceValue}>${quote.monto.toLocaleString()}</Text>
                  {isBestPrice && (
                    <View style={styles.bestPriceBadge}>
                      <Text style={styles.bestPriceText}>Mejor precio</Text>
                    </View>
                  )}
                </View>

                {isBestRating && (
                  <View style={styles.bestRatingBadge}>
                    <Text style={styles.bestRatingText}>Mejor calificado</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleSelectQuote(quote.id)}
              >
                <Text style={styles.selectButtonText}>Seleccionar esta cotización</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
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
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  singleQuoteAlert: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  alertIcon: {
    fontSize: 24,
    color: '#1976D2',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D47A1',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sortContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: 'white',
  },
  quotesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  quoteCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quoteHeaderLeft: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  providerRating: {
    fontSize: 14,
    color: '#666',
  },
  recommendedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  recommendedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  quoteDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  quoteDetailsContainer: {
    marginBottom: 16,
  },
  priceContainer: {
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745',
  },
  bestPriceBadge: {
    backgroundColor: '#D1F2EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  bestPriceText: {
    color: '#0D7A5F',
    fontSize: 12,
    fontWeight: '600',
  },
  bestRatingBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bestRatingText: {
    color: '#856404',
    fontSize: 12,
    fontWeight: '600',
  },
  selectButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
