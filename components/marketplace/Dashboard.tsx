import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useApp } from '../../app/context/AppContext';

export default function Dashboard() {
  const { state } = useApp();
  const router = useRouter();

  if (!state.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Por favor, inicia sesión</Text>
      </View>
    );
  }

  const myServices = state.services.filter(
    (s) => s.solicitanteId === state.currentUser?.id
  );

  const myQuotes = state.quotes.filter((q) => {
    const service = state.services.find((s) => s.id === q.servicioId);
    return service?.solicitanteId === state.currentUser?.id;
  });

  const providedQuotes = state.quotes.filter(
    (q) => q.proveedorId === state.currentUser?.id
  );

  const mySupplies = state.supplies.filter(
    (s) => s.solicitanteId === state.currentUser?.id
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>
            Bienvenido, {state.currentUser.nombre}
          </Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{state.currentUser.role}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{myServices.length}</Text>
          <Text style={styles.statLabel}>Mis Servicios</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {state.currentUser.role === 'Proveedor Servicio'
              ? providedQuotes.length
              : myQuotes.length}
          </Text>
          <Text style={styles.statLabel}>
            {state.currentUser.role === 'Proveedor Servicio'
              ? 'Cotizaciones Enviadas'
              : 'Cotizaciones Recibidas'}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mySupplies.length}</Text>
          <Text style={styles.statLabel}>Insumos Solicitados</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

        {state.currentUser.role === 'Solicitante' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/create-service')}
            >
              <Text style={styles.actionButtonText}>
                ➕ Crear Solicitud de Servicio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/create-supply')}
            >
              <Text style={styles.actionButtonText}>
                📦 Solicitar Insumos
              </Text>
            </TouchableOpacity>
          </>
        )}

        {state.currentUser.role === 'Proveedor Servicio' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text style={styles.actionButtonText}>
                🔍 Ver Servicios Disponibles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/create-supply')}
            >
              <Text style={styles.actionButtonText}>
                📦 Solicitar Insumos
              </Text>
            </TouchableOpacity>
          </>
        )}

        {state.currentUser.role === 'Proveedor Insumos' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/counter')}
            >
              <Text style={styles.actionButtonText}>
                📦 Ver Insumos Disponibles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/create-supply')}
            >
              <Text style={styles.actionButtonText}>
                ➕ Solicitar Insumos
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servicios Recientes</Text>
        {myServices.length === 0 ? (
          <Text style={styles.emptyText}>No hay servicios todavía</Text>
        ) : (
          myServices.slice(0, 3).map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{service.titulo}</Text>
              <Text style={styles.serviceCategory}>{service.categoria}</Text>
              <View
                style={[
                  styles.statusBadge,
                  service.estado === 'ASIGNADO'
                    ? styles.statusAssigned
                    : styles.statusPending,
                ]}
              >
                <Text style={styles.statusText}>{service.estado}</Text>
              </View>
            </View>
          ))
        )}
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
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  roleBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  roleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statusPending: {
    backgroundColor: '#FFF3CD',
  },
  statusAssigned: {
    backgroundColor: '#D1ECF1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
