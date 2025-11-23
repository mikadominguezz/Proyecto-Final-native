# Marketplace de Servicios - React Native

Aplicación móvil de marketplace de servicios desarrollada con React Native y Expo, implementando todas las funcionalidades del trabajo práctico 2025.

## 📱 Características Implementadas

### Gestión de Usuarios
- **Login con roles de usuario**: Solicitante, Proveedor de Servicios, Proveedor de Insumos
- **Autenticación segura**: Sistema de login con validación de credenciales
- **Perfiles diferenciados**: Cada rol tiene acceso a funcionalidades específicas

### Gestión de Servicios
- **Crear solicitudes de servicio**: Los solicitantes pueden crear nuevas solicitudes
- **Listar servicios disponibles**: Ver todos los servicios pendientes
- **Filtrar servicios**: Búsqueda por título o categoría
- **Categorías**: Jardinería, Plomería, Electricidad, Limpieza, Construcción, Pintura, Carpintería, Otros

### Sistema de Cotizaciones
- **Enviar cotizaciones**: Los proveedores pueden cotizar servicios disponibles
- **Gestionar cotizaciones**: Ver todas las cotizaciones recibidas o enviadas
- **Seleccionar cotización ganadora**: Los solicitantes pueden elegir la mejor oferta
- **Estados de cotización**: PENDIENTE, ACEPTADA

### Gestión de Insumos
- **Solicitar insumos**: Los solicitantes pueden pedir materiales necesarios
- **Estados de insumos**: ABIERTO, CERRADO
- **Tracking de solicitudes**: Seguimiento de todas las peticiones de insumos

### Dashboard Personalizado
- **Vista adaptada por rol**: Información relevante según el tipo de usuario
- **Estadísticas en tiempo real**: Contador de servicios, cotizaciones e insumos
- **Acciones rápidas**: Botones de acceso directo a funciones principales
- **Servicios recientes**: Vista rápida de los últimos servicios creados

### Navegación Intuitiva
- **Tab navigation**: 4 pestañas principales (Dashboard, Servicios, Cotizaciones, Login)
- **Stack navigation**: Navegación entre pantallas con historial
- **Rutas dinámicas**: Paso de parámetros entre pantallas

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
   - Funcionalidades:
     - ✅ Crear solicitudes de servicio
     - ✅ Solicitar insumos
     - ✅ Ver y gestionar cotizaciones recibidas
     - ✅ Seleccionar cotización ganadora

2. **Juan Pérez** (Proveedor Servicio)
   - Email: jardin@example.com
   - Password: 123456
   - Funcionalidades:
     - ✅ Ver servicios disponibles
     - ✅ Enviar cotizaciones a servicios
     - ✅ Ver historial de cotizaciones enviadas

3. **Carlos López** (Proveedor Insumos)
   - Email: insumos@example.com
   - Password: 123456
   - Funcionalidades:
     - ✅ Ver solicitudes de insumos
     - ✅ Enviar ofertas de insumos (próximamente)
     - ✅ Gestionar inventario (próximamente)

## 📱 Navegación y Flujos de Usuario

### Tab Navigation (4 pestañas principales)
1. **Dashboard** (🏠) - Vista general con estadísticas
2. **Servicios** (📋) - Lista de servicios disponibles
3. **Cotizaciones** (📄) - Gestión de cotizaciones
4. **Login** (👤) - Autenticación de usuarios

### Rutas Adicionales (Stack Navigation)
- `/create-service` - Formulario para crear nuevo servicio
- `/create-quote?serviceId=X` - Formulario para enviar cotización
- `/create-supply` - Formulario para solicitar insumos

### Flujos Principales

#### Flujo de Solicitante:
1. Login como María García
2. Dashboard → Ver estadísticas personales
3. Crear Solicitud de Servicio → Completar formulario
4. Mis Cotizaciones → Ver ofertas recibidas
5. Seleccionar cotización ganadora → Confirmar selección

#### Flujo de Proveedor:
1. Login como Juan Pérez
2. Servicios → Ver lista de servicios disponibles
3. Enviar Cotización → Completar monto y descripción
4. Dashboard → Ver cotizaciones enviadas

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
│   ├── (tabs)/               # Navegación por tabs
│   │   ├── _layout.tsx       # Configuración de tabs
│   │   ├── index.tsx         # Dashboard (pantalla principal)
│   │   ├── explore.tsx       # Lista de servicios
│   │   ├── counter.tsx       # Mis cotizaciones
│   │   └── login.tsx         # Autenticación
│   ├── create-service.tsx    # Pantalla: Crear servicio
│   ├── create-quote.tsx      # Pantalla: Enviar cotización
│   ├── create-supply.tsx     # Pantalla: Solicitar insumo
│   ├── _layout.tsx           # Layout raíz con AppProvider
│   ├── context/
│   │   └── AppContext.tsx    # Estado global (Context API + Reducer)
│   └── data/
│       └── mockData.ts       # Datos iniciales de prueba
├── components/
│   ├── marketplace/          # Componentes de negocio
│   │   ├── Dashboard.tsx     # Dashboard personalizado
│   │   ├── ServicesList.tsx  # Lista de servicios
│   │   ├── MyQuotes.tsx      # Gestión de cotizaciones
│   │   ├── Login.tsx         # Formulario de login
│   │   ├── CreateService.tsx # Formulario crear servicio
│   │   ├── CreateQuote.tsx   # Formulario enviar cotización
│   │   └── CreateSupply.tsx  # Formulario solicitar insumo
│   ├── ui/                   # Componentes UI reutilizables
│   │   ├── icon-symbol.tsx   # Sistema de iconos
│   │   └── collapsible.tsx   # Componente colapsable
│   ├── themed-text.tsx       # Texto con tema
│   ├── themed-view.tsx       # Vista con tema
│   └── haptic-tab.tsx        # Tab con feedback háptico
├── constants/
│   └── theme.ts              # Colores y fuentes del tema
└── hooks/
    ├── use-color-scheme.ts   # Hook para tema claro/oscuro
    └── use-theme-color.ts    # Hook para colores del tema
```

## 🔄 Arquitectura y Patrones

### Gestión de Estado
- **Context API + useReducer**: Estado global centralizado
- **AppContext**: Manejo de usuarios, servicios, cotizaciones e insumos
- **Acciones disponibles**:
  - `LOGIN` / `LOGOUT`: Autenticación
  - `ADD_SERVICE` / `UPDATE_SERVICE`: Servicios
  - `ADD_QUOTE` / `UPDATE_QUOTE` / `DELETE_QUOTE` / `SELECT_QUOTE`: Cotizaciones
  - `ADD_SUPPLY` / `UPDATE_SUPPLY` / `DELETE_SUPPLY`: Insumos
  - `ADD_SUPPLY_OFFER`: Ofertas de insumos

### Navegación
- **Expo Router**: Sistema de enrutamiento basado en archivos
- **Tab Navigation**: Navegación principal con 4 pestañas
- **Stack Navigation**: Navegación modal para formularios
- **Parámetros de URL**: Paso de datos entre pantallas (ej: `?serviceId=1`)

### Componentes
- **Componentes de presentación**: UI reutilizable con temas
- **Componentes de negocio**: Lógica específica del marketplace
- **Hooks personalizados**: `useColorScheme`, `useThemeColor`

### Diferencias con la versión Web

| Aspecto | Web (React) | Mobile (React Native) |
|---------|-------------|----------------------|
| UI Components | HTML (div, button, input) | React Native (View, TouchableOpacity, TextInput) |
| Estilos | TailwindCSS | StyleSheet API |
| Navegación | React Router | Expo Router + Tab/Stack Navigation |
| Alertas | alert() / SweetAlert | Alert.alert() |
| Formularios | HTML form | ScrollView + TextInput |
| Iconos | SVG / Font Awesome | SF Symbols (iOS) / Material Icons (Android) |
| Interacción | onClick | onPress + Haptic Feedback |
| Temas | CSS Variables | useColorScheme + Constants |

## ⚙️ Comandos Disponibles

```bash
npm start      # Inicia el servidor de desarrollo
npm run android # Abre en emulador Android
npm run ios     # Abre en simulador iOS
npm run web     # Abre en navegador web
```

## 📝 Funcionalidades Implementadas vs Requerimientos

### ✅ Completado

- [x] **Login diferenciado por roles** (Solicitante, Proveedor Servicio, Proveedor Insumos)
- [x] **CRUD de Servicios** (Crear, Leer, Actualizar estados)
- [x] **Sistema de Cotizaciones** (Crear, Listar, Seleccionar ganadora)
- [x] **Gestión de Insumos** (Crear solicitudes, Listar)
- [x] **Dashboard personalizado** (Estadísticas por rol)
- [x] **Filtros y búsqueda** (Servicios por título/categoría)
- [x] **Estados de servicio** (PENDIENTE, ASIGNADO)
- [x] **Estados de cotización** (PENDIENTE, ACEPTADA)
- [x] **Navegación intuitiva** (Tabs + Stack)
- [x] **Validación de formularios**
- [x] **Feedback al usuario** (Alerts, mensajes de éxito/error)
- [x] **Temas claro/oscuro** (Soporte automático)
- [x] **Datos de prueba** (Mock data completo)

### 🚧 En Desarrollo

- [ ] **Ofertas de insumos por proveedores** (UI lista, falta integración)
- [ ] **Sistema de calificaciones** (Próxima iteración)
- [ ] **Chat entre usuarios** (Próxima iteración)
- [ ] **Notificaciones push** (Próxima iteración)
- [ ] **Integración con backend** (API REST pendiente)
- [ ] **Carga de imágenes** (Galería/cámara)

## 📝 Notas

- La aplicación funciona **completamente offline** con datos mock
- Todas las funcionalidades principales del trabajo práctico están **implementadas**
- El código está **optimizado para producción** con TypeScript
- Compatible con **iOS, Android y Web** (universal app)
- Sigue las **mejores prácticas** de React Native y Expo
- **Código limpio y documentado** para fácil mantenimiento

---

**Desarrollado con ❤️ usando React Native y Expo**
