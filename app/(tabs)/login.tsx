import { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../data/mockData';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = Colors[colorScheme ?? 'light'].text;
  const { state, dispatch } = useApp();

  const handleLogin = () => {
    const user = state.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      Alert.alert(
        'Login Exitoso',
        `Bienvenido ${user.nombre}\nRol: ${user.role}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Error',
        'Credenciales incorrectas',
        [{ text: 'OK' }]
      );
    }
  };

  const fillCredentials = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText 
              type="title" 
              style={[styles.title, { fontFamily: Fonts.rounded }]}
            >
              Marketplace de Servicios
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Ingresa tus credenciales para acceder al sistema
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: textColor,
                    backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
                    borderColor: isDark ? '#3A3A3C' : '#E5E5EA'
                  }
                ]}
                placeholder="usuario@example.com"
                placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Contraseña</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: textColor,
                    backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
                    borderColor: isDark ? '#3A3A3C' : '#E5E5EA'
                  }
                ]}
                placeholder="••••••"
                placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </ThemedView>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.loginButtonText}>
                Iniciar Sesión
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={[styles.testUsers, { borderTopColor: isDark ? '#3A3A3C' : '#E5E5EA' }]}>
            <ThemedText style={styles.testUsersTitle}>
              Usuarios de prueba:
            </ThemedText>
            
            {MOCK_USERS.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={[
                  styles.testUserCard,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }
                ]}
                onPress={() => fillCredentials(user.email, user.password)}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.testUserRole}>
                  {user.role}
                </ThemedText>
                <ThemedText style={styles.testUserCredentials}>
                  {user.email} / {user.password}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  form: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  testUsers: {
    borderTopWidth: 1,
    paddingTop: 20,
  },
  testUsersTitle: {
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.7,
  },
  testUserCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  testUserRole: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,
  },
  testUserCredentials: {
    fontSize: 12,
    opacity: 0.7,
  },
});
