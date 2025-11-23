# Marketplace de Servicios con Insumos - React Native

> Aplicación móvil completa desarrollada con React Native y Expo para gestión de servicios, cotizaciones e insumos

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Probar la App

**Opción 1: En tu dispositivo móvil (Recomendado)**
1. Instala [Expo Go](https://expo.dev/go) en tu celular
2. Ejecuta `npm start`
3. Escanea el código QR con Expo Go (Android) o la cámara (iOS)

**Opción 2: En simulador**
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 Usuarios de Prueba

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| María García | maria@example.com | 123456 | Solicitante |
| Juan Pérez | jardin@example.com | 123456 | Proveedor Servicio |
| Carlos López | insumos@example.com | 123456 | Proveedor Insumos |

*Tip: En la pantalla de login, toca cualquier usuario para autocompletar las credenciales*

## ✨ Funcionalidades Principales

- ✅ **Login diferenciado** por 3 roles de usuario
- ✅ **Crear y gestionar servicios** (jardinería, plomería, etc.)
- ✅ **Enviar y recibir cotizaciones**
- ✅ **Seleccionar cotización ganadora**
- ✅ **Solicitar insumos**
- ✅ **Dashboard personalizado** con estadísticas
- ✅ **Búsqueda y filtros** de servicios
- ✅ **Temas claro/oscuro** automáticos
- ✅ **Navegación intuitiva** con tabs

## 📂 Navegación

### Tabs (Barra inferior)
- 🏠 **Dashboard**: Estadísticas y acciones rápidas
- 📋 **Servicios**: Lista de servicios disponibles
- 📄 **Cotizaciones**: Gestión de ofertas
- 👤 **Login**: Autenticación

### Pantallas Adicionales
- Crear Servicio
- Enviar Cotización
- Solicitar Insumos

## 📚 Documentación

- [**README_MARKETPLACE.md**](./README_MARKETPLACE.md) - Guía completa de usuario
- [**RESUMEN_IMPLEMENTACION.md**](./RESUMEN_IMPLEMENTACION.md) - Documentación técnica detallada

## 🛠️ Stack Tecnológico

- **React Native** - Framework móvil
- **Expo SDK 54** - Tooling y APIs
- **TypeScript** - Tipado estático
- **Expo Router** - Navegación
- **Context API** - Estado global

## 📝 Scripts Disponibles

```bash
npm start          # Servidor de desarrollo
npm run android    # Abrir en Android
npm run ios        # Abrir en iOS
npm run web        # Abrir en navegador
npm run lint       # Linter
```

## 🎯 Estructura del Proyecto

```
app/
  (tabs)/          # Pantallas principales con tabs
  *.tsx            # Pantallas adicionales (crear servicio, etc.)
  context/         # Estado global
components/
  marketplace/     # Componentes de negocio
  ui/             # Componentes reutilizables
```

## 📸 Flujo de Uso

1. **Login** → Selecciona un usuario de prueba
2. **Dashboard** → Ve tus estadísticas
3. **Crear Servicio** (Solicitante) → Completa el formulario
4. **Enviar Cotización** (Proveedor) → Cotiza un servicio
5. **Seleccionar Ganadora** (Solicitante) → Elige la mejor oferta

## 🌟 Características Destacadas

- **Funciona offline** con datos mock completos
- **Validaciones en tiempo real** en formularios
- **Feedback visual** con badges de estado
- **Diseño responsive** adaptado a diferentes pantallas
- **Código limpio** con TypeScript y best practices

## 📄 Licencia

Este proyecto fue desarrollado como parte del Trabajo Práctico 2025 de Desarrollo Web/Mobile.

---

**Desarrollado con ❤️ usando React Native y Expo**
