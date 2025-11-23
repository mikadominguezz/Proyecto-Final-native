# 🚀 Guía de Instalación y Ejecución

## Requisitos Previos

### Software Necesario
- **Node.js** 18.0 o superior → [Descargar](https://nodejs.org/)
- **npm** o **yarn** (incluido con Node.js)
- **Expo Go** en tu smartphone → [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Opcional (para simuladores)
- **Xcode** (macOS) para iOS Simulator
- **Android Studio** para Android Emulator

---

## 📥 Instalación

### 1. Clonar o Descargar el Proyecto
```bash
# Si tienes Git
git clone [URL_DEL_REPOSITORIO]
cd Proyecto-Final-native

# O simplemente descargar el ZIP y extraer
```

### 2. Instalar Dependencias
```bash
npm install
```

**Nota:** Este paso puede tomar 2-3 minutos la primera vez.

### 3. Verificar Instalación
```bash
npm start
```

Si todo está correcto, verás:
```
› Metro waiting on exp://192.168.X.X:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

---

## 📱 Ejecutar en Dispositivo Real (Recomendado)

Esta es la forma MÁS FÁCIL y RÁPIDA de probar la app.

### iOS (iPhone/iPad)
1. Abre la app **Cámara** nativa
2. Apunta al código QR en la terminal
3. Tap en la notificación "Abrir en Expo Go"
4. Espera a que cargue (30-60 segundos)

### Android
1. Abre la app **Expo Go**
2. Tap en "Scan QR Code"
3. Escanea el código QR en la terminal
4. Espera a que cargue (30-60 segundos)

### ⚠️ Solución de Problemas

**"No puedo escanear el QR"**
```bash
# En la terminal donde corre npm start, presiona:
s  # Para cambiar a modo LAN/Tunnel
```

**"Connection timeout"**
- Asegúrate de que tu celular y PC estén en la misma red WiFi
- Desactiva VPN si tienes una activa
- Reinicia el servidor: Ctrl+C → npm start

**"Error loading app"**
```bash
# Limpiar caché
npm start --clear
```

---

## 💻 Ejecutar en Simulador/Emulador

### iOS Simulator (Solo macOS)

#### Prerequisitos
1. Instalar Xcode desde App Store (gratis)
2. Abrir Xcode → Preferences → Components → Instalar un iOS Simulator

#### Ejecutar
```bash
npm run ios
```

Primera vez tomará 3-5 minutos (instala dependencias de iOS).

### Android Emulator

#### Prerequisitos
1. Instalar [Android Studio](https://developer.android.com/studio)
2. Abrir Android Studio → More Actions → Virtual Device Manager
3. Create Device → Pixel 5 → Download Android 13 → Finish

#### Ejecutar
```bash
npm run android
```

Primera vez tomará 5-10 minutos (compila app nativa).

---

## 🌐 Ejecutar en Navegador Web

```bash
npm run web
```

Abrirá automáticamente http://localhost:8081 en tu navegador.

**Nota:** Algunas features móviles no funcionarán (cámara, notificaciones, etc.)

---

## 🎯 Primeros Pasos Después de Abrir la App

### 1. Login
La app abre en el tab "Login". Verás 3 usuarios de prueba:

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| María García | maria@example.com | 123456 | Solicitante |
| Juan Pérez | jardin@example.com | 123456 | Proveedor Servicio |
| Carlos López | insumos@example.com | 123456 | Proveedor Insumos |

**Tip:** Toca cualquier card de usuario para autocompletar las credenciales.

### 2. Explorar Dashboard
Después del login, verás:
- Tus estadísticas personalizadas
- Botones de acciones rápidas
- Servicios recientes

### 3. Probar Flujo Completo

#### Como Solicitante (María)
1. Dashboard → Tap "Crear Solicitud de Servicio"
2. Completar: Título, Descripción, Categoría
3. Tap "Crear Servicio"
4. Ver servicio en tab "Servicios"

#### Como Proveedor (Juan)
1. Tab "Servicios" → Buscar servicio
2. Tap "Enviar Cotización"
3. Completar: Monto, Descripción
4. Tap "Enviar Cotización"

#### Como Solicitante (María)
1. Tab "Cotizaciones" → Ver cotización de Juan
2. Tap "Seleccionar esta cotización"
3. Confirmar → Servicio ahora es "ASIGNADO"

---

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm start              # Servidor de desarrollo
npm run android        # Android Emulator
npm run ios            # iOS Simulator
npm run web            # Navegador web

# Utilidades
npm run lint           # Revisar código
npm start --clear      # Limpiar caché y reiniciar

# Producción (avanzado)
npx expo build:android  # Build APK para Android
npx expo build:ios      # Build IPA para iOS
```

---

## 🔍 Estructura de Navegación

### Tabs (Barra Inferior)
- 🏠 **Dashboard**: Vista principal con estadísticas
- 📋 **Servicios**: Lista de servicios disponibles
- 📄 **Cotizaciones**: Gestión de cotizaciones
- 👤 **Login**: Autenticación

### Pantallas Modales
Accesibles desde botones en Dashboard o acciones en listas:
- **Crear Servicio**: Formulario completo
- **Enviar Cotización**: Formulario con monto/descripción
- **Solicitar Insumos**: Formulario de insumos

---

## 🐛 Problemas Comunes

### "Module not found: can't resolve..."
```bash
npm install
npm start --clear
```

### "Metro Bundler error"
```bash
# Detener todos los procesos
Ctrl+C
# Limpiar cache de npm
rm -rf node_modules
npm install
npm start --clear
```

### "Expo Go desconectado"
- Verificar WiFi (mismo network en PC y celular)
- Desactivar firewall/VPN temporalmente
- Usar modo Tunnel: presionar `s` en terminal

### App se cierra al abrir
- Verificar que Node.js sea versión 18+
- Reinstalar Expo Go en el celular
- Probar en otro dispositivo

### Cambios no se reflejan
- Recargar: Agitar el celular → "Reload"
- O presionar `r` en la terminal del servidor

---

## 📱 Consejos de Desarrollo

### Hot Reload
Los cambios en archivos `.tsx` se reflejan automáticamente:
1. Guarda el archivo (Ctrl+S / Cmd+S)
2. La app se recarga en 2-3 segundos

### Debug
- **Menú de desarrollo**: Agita el celular / Cmd+D (iOS) / Cmd+M (Android)
- **Logs**: Ver terminal donde corre `npm start`
- **Errores**: Se muestran en pantalla roja con stack trace

### Productividad
- Usa VS Code con extensión "Expo Tools"
- Habilita Auto Save en editor
- Mantén el servidor corriendo (no cerrar terminal)

---

## 📚 Recursos de Ayuda

### Documentación del Proyecto
- `README.md` - Este archivo
- `README_MARKETPLACE.md` - Guía de funcionalidades
- `TESTING_GUIDE.md` - Cómo probar todas las features
- `RESUMEN_IMPLEMENTACION.md` - Documentación técnica
- `CHANGELOG.md` - Cambios realizados

### Documentación Externa
- [Expo Docs](https://docs.expo.dev/) - Documentación oficial de Expo
- [React Native Docs](https://reactnative.dev/) - Guías de React Native
- [Expo Router](https://expo.github.io/router/docs/) - Sistema de navegación

### Comunidad
- [Expo Discord](https://chat.expo.dev/) - Soporte de la comunidad
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo) - Preguntas frecuentes

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Node.js versión 18+ instalado (`node --version`)
- [ ] Dependencias instaladas (`npm install` ejecutado)
- [ ] Servidor corriendo sin errores (`npm start`)
- [ ] Celular/PC en misma red WiFi
- [ ] Expo Go actualizado a última versión
- [ ] Caché limpiado (`npm start --clear`)

---

## 🎓 Para Evaluadores

### Verificación Rápida (5 minutos)
1. `npm install` → `npm start`
2. Escanear QR con Expo Go
3. Login como María → Crear Servicio
4. Login como Juan → Enviar Cotización
5. Login como María → Seleccionar Cotización

### Testing Completo (30 minutos)
Seguir guía en `TESTING_GUIDE.md`

### Revisión de Código
```
app/                    # Lógica de navegación
components/marketplace/ # Componentes de negocio
app/context/           # Estado global (Context API)
```

---

## 📞 Contacto y Soporte

Si encuentras algún problema:
1. Revisar sección "Problemas Comunes" arriba
2. Consultar archivos de documentación
3. Verificar checklist de verificación
4. Reportar issue con:
   - Sistema operativo
   - Versión de Node.js
   - Mensaje de error completo
   - Pasos para reproducir

---

**Última actualización**: Noviembre 2025  
**Versión de la app**: 1.0.0  
**Expo SDK**: 54.0.20  
**React Native**: 0.81.5
