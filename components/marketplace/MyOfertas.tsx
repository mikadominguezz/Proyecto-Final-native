import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useApp } from '../../app/context/AppContext';
import MyOffers from './MyOffers';
import ServicesList from './ServicesList';

export default function MyOfertas() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'services' | 'supplies'>('services');

  if (!state.currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Por favor, inicia sesión</Text>
      </View>
    );
  }

  // Solo proveedores pueden ver esta sección
  if (state.currentUser.role === 'Solicitante') {
    return (
      <View style={styles.container}>
        <Text style={styles.infoMessage}>
          Esta sección es para proveedores.{'\n'}
          Como solicitante, usa el tab &quot;Solicitudes&quot; para gestionar tus pedidos.
        </Text>
      </View>
    );
  }

  // Proveedor de Insumos: Solo ve insumos, no servicios
  if (state.currentUser.role === 'Proveedor Insumos') {
    return (
      <SafeAreaView style={styles.container}>
        <MyOffers />
      </SafeAreaView>
    );
  }

  // Proveedor de Servicios: Ve servicios disponibles
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'services' && styles.tabActive]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={[styles.tabText, activeTab === 'services' && styles.tabTextActive]}>
            Servicios
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'supplies' && styles.tabActive]}
          onPress={() => setActiveTab('supplies')}
        >
          <Text style={[styles.tabText, activeTab === 'supplies' && styles.tabTextActive]}>
            Insumos
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'services' ? (
        <ServicesList />
      ) : (
        <MyOffers />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  infoMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
    padding: 20,
    lineHeight: 24,
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
    borderBottomColor: '#28A745',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#28A745',
    fontWeight: '600',
  },
});
