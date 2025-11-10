# Marketplace de Servicios - React Native

Aplicación móvil de marketplace de servicios desarrollada con React Native y Expo, traducida desde el proyecto web original.

## 📱 Características

- **Login con roles de usuario**: Solicitante, Proveedor de Servicios, Proveedor de Insumos
- **Dashboard personalizado**: Vista adaptada según el rol del usuario
- **Gestión de servicios**: Ver lista de servicios disponibles
- **Sistema de cotizaciones**: Gestión de cotizaciones por servicio
- **Navegación por tabs**: Interfaz intuitiva con navegación inferior

## 🚀 Cómo probar con Expo Go

### Opción 1: Escanear código QR (Recomendado)

1. **Instala Expo Go** en tu dispositivo móvil:
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Inicia el servidor** (ya está corriendo):
   ```bash
   npm start
   ```

3. **Escanea el código QR**:
   - En **Android**: Abre la app Expo Go y usa el escáner de QR
   - En **iOS**: Abre la cámara nativa y escanea el código QR

### Opción 2: Simuladores locales

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

## 👥 Usuarios de Prueba

La aplicación incluye 3 usuarios de prueba. En la pantalla de login, puedes hacer clic en cualquiera de ellos para autocompletar las credenciales:

1. **María García** (Solicitante)
   - Email: maria@example.com
   - Password: 123456
   - Puede: Crear servicios, solicitar insumos, ver cotizaciones

2. **Juan Pérez** (Proveedor Servicio)
   - Email: jardin@example.com
   - Password: 123456
   - Puede: Ver servicios disponibles, enviar cotizaciones

3. **Carlos López** (Proveedor Insumos)
   - Email: insumos@example.com
   - Password: 123456
   - Puede: Gestionar ofertas de insumos

## 📱 Navegación

La app tiene 4 tabs principales:

1. **Dashboard** - Vista general con estadísticas y acciones rápidas
2. **Servicios** - Lista de servicios disponibles
3. **Cotizaciones** - Gestión de cotizaciones recibidas/enviadas
4. **Login** - Autenticación de usuarios

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para desarrollo móvil
- **Expo** - Plataforma de desarrollo
- **Expo Router** - Navegación basada en archivos
- **TypeScript** - Tipado estático
- **Context API** - Gestión de estado global

## 📂 Estructura del Proyecto

```
proyecto-prueba-native/
├── app/
│   ├── (tabs)/           # Pantallas de navegación por tabs
│   │   ├── index.tsx     # Dashboard
│   │   ├── explore.tsx   # Lista de servicios
│   │   ├── counter.tsx   # Mis cotizaciones
│   │   └── login.tsx     # Login
│   ├── context/
│   │   └── AppContext.tsx # Estado global
│   └── data/
│       └── mockData.ts    # Datos de prueba
├── components/
│   └── marketplace/       # Componentes del marketplace
│       ├── Dashboard.tsx
│       ├── ServicesList.tsx
│       ├── MyQuotes.tsx
│       └── Login.tsx
└── package.json
```

## 🔄 Diferencias con la versión Web

- **UI Components**: Todos los componentes HTML fueron reemplazados por componentes nativos de React Native
- **Navegación**: Se usa Expo Router en lugar de React Router
- **Estilos**: StyleSheet de React Native en lugar de TailwindCSS
- **Interacción**: TouchableOpacity en lugar de botones HTML
- **Alertas**: Alert nativo de React Native
- **Formularios**: TextInput nativo en lugar de input HTML

## ⚙️ Comandos Disponibles

```bash
npm start      # Inicia el servidor de desarrollo
npm run android # Abre en emulador Android
npm run ios     # Abre en simulador iOS
npm run web     # Abre en navegador web
```

## 📝 Notas

- La aplicación funciona completamente offline con datos mock
- Todas las funcionalidades principales están implementadas
- Algunas funciones avanzadas muestran alertas "en desarrollo"
- Compatible con iOS, Android y Web

## 🎯 Próximos Pasos (Opcionales)

- [ ] Integrar con API backend
- [ ] Implementar creación de servicios desde móvil
- [ ] Agregar sistema de notificaciones push
- [ ] Implementar chat entre usuarios
- [ ] Agregar sistema de calificaciones

---

**Desarrollado con ❤️ usando React Native y Expo**
