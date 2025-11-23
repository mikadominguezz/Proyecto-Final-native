# Guía de Testing - Marketplace de Servicios

Esta guía te ayudará a probar todas las funcionalidades implementadas en la aplicación.

## 🧪 Escenarios de Prueba

### 1. Login y Autenticación

#### Test 1.1: Login exitoso como Solicitante
1. Abrir la app
2. Ir al tab "Login" (👤)
3. Tocar el card de "María García" (o ingresar maria@example.com / 123456)
4. Tap "Iniciar Sesión"
5. ✅ **Resultado esperado**: Alert de "Login Exitoso" y usuario logueado

#### Test 1.2: Login con credenciales incorrectas
1. Tab "Login"
2. Ingresar email: test@test.com
3. Ingresar password: wrong
4. Tap "Iniciar Sesión"
5. ✅ **Resultado esperado**: Alert de "Credenciales incorrectas"

#### Test 1.3: Cambiar entre usuarios
1. Login como María (Solicitante)
2. Verificar Dashboard muestra "Solicitante" en badge
3. Ir a Login
4. Login como Juan (Proveedor)
5. ✅ **Resultado esperado**: Dashboard ahora muestra "Proveedor Servicio"

---

### 2. Gestión de Servicios (Solicitante)

#### Test 2.1: Crear servicio completo
1. Login como María García
2. Dashboard → Tap "➕ Crear Solicitud de Servicio"
3. Completar formulario:
   - Título: "Instalación de aire acondicionado"
   - Descripción: "Necesito instalar 2 splits en departamento"
   - Categoría: Seleccionar "Electricidad"
4. Tap "Crear Servicio"
5. ✅ **Resultados esperados**:
   - Alert "Servicio creado correctamente"
   - Volver automáticamente al Dashboard
   - Tab "Servicios" muestra el nuevo servicio

#### Test 2.2: Validación de campos vacíos
1. Dashboard → Crear Servicio
2. Dejar título vacío
3. Tap "Crear Servicio"
4. ✅ **Resultado esperado**: Alert "Por favor completa todos los campos"

#### Test 2.3: Cambiar categoría
1. Crear Servicio → Scroll horizontal en categorías
2. Probar diferentes categorías: Jardinería, Plomería, Limpieza
3. ✅ **Resultado esperado**: Categoría seleccionada cambia de color (azul)

---

### 3. Listar y Buscar Servicios

#### Test 3.1: Ver todos los servicios
1. Tab "Servicios"
2. ✅ **Resultado esperado**: 
   - Ver servicios precargados + los creados
   - Cada card muestra: título, descripción, categoría, solicitante
   - Contador de cotizaciones

#### Test 3.2: Buscar servicios
1. Tab "Servicios"
2. En buscador escribir: "jardín"
3. ✅ **Resultado esperado**: Solo muestra "Mantenimiento de Jardín"
4. Borrar búsqueda
5. ✅ **Resultado esperado**: Vuelven a aparecer todos

#### Test 3.3: Buscar por categoría
1. Tab "Servicios"
2. Buscar: "plomería"
3. ✅ **Resultado esperado**: Muestra servicio de categoría Plomería

---

### 4. Sistema de Cotizaciones (Proveedor)

#### Test 4.1: Enviar cotización
1. Login como Juan Pérez (jardin@example.com)
2. Tab "Servicios"
3. Buscar servicio "Mantenimiento de Jardín"
4. Tap "Enviar Cotización"
5. ✅ **Resultado esperado**: 
   - Muestra pantalla con info del servicio
   - Formulario de cotización vacío
6. Completar:
   - Monto: 25000
   - Descripción: "Incluye poda de 5 árboles, corte de césped y limpieza completa"
7. Tap "Enviar Cotización"
8. ✅ **Resultados esperados**:
   - Alert "Cotización enviada correctamente"
   - Volver a lista de servicios
   - Contador de cotizaciones aumentó en 1

#### Test 4.2: Validar monto
1. Enviar Cotización
2. Monto: -100
3. Tap "Enviar Cotización"
4. ✅ **Resultado esperado**: Alert "El monto debe ser un número válido mayor a 0"

#### Test 4.3: Ver cotizaciones enviadas
1. Como Proveedor, ir a Dashboard
2. ✅ **Resultado esperado**: Card "Cotizaciones Enviadas" muestra número correcto

---

### 5. Gestionar Cotizaciones (Solicitante)

#### Test 5.1: Ver cotizaciones recibidas
1. Login como María García
2. Tab "Cotizaciones"
3. ✅ **Resultados esperados**:
   - Ver servicios agrupados
   - Cada servicio muestra sus cotizaciones
   - Cotización muestra: proveedor, monto, descripción, estado

#### Test 5.2: Seleccionar cotización ganadora
1. Tab "Cotizaciones"
2. Servicio "Mantenimiento de Jardín" → Ver cotización de Juan
3. Tap "Seleccionar esta cotización"
4. En Alert, tap "Confirmar"
5. ✅ **Resultados esperados**:
   - Alert "Cotización seleccionada correctamente"
   - Cotización muestra badge verde "✓ Seleccionada"
   - Estado del servicio cambia a "ASIGNADO"
   - Botón "Seleccionar" desaparece
   - Estado de cotización cambia a "ACEPTADA"

#### Test 5.3: Verificar restricción de una sola cotización
1. Después de seleccionar una cotización
2. ✅ **Resultado esperado**: 
   - Otras cotizaciones del mismo servicio no muestran botón "Seleccionar"
   - Solo la seleccionada muestra badge verde

#### Test 5.4: Ver servicio sin cotizaciones
1. Crear un servicio nuevo
2. Tab "Cotizaciones"
3. ✅ **Resultado esperado**: Muestra "No hay cotizaciones para este servicio"

---

### 6. Gestión de Insumos

#### Test 6.1: Solicitar insumo
1. Login como María García
2. Dashboard → Tap "📦 Solicitar Insumos"
3. Completar:
   - Nombre: "Cemento Portland"
   - Descripción: "Necesito 20 bolsas de 50kg para construcción"
   - Cantidad: 20
4. Tap "Crear Solicitud"
5. ✅ **Resultados esperados**:
   - Alert "Solicitud de insumo creada correctamente"
   - Dashboard muestra contador actualizado en "Insumos Solicitados"

#### Test 6.2: Validar cantidad
1. Solicitar Insumos
2. Cantidad: -5 o "abc"
3. ✅ **Resultado esperado**: Alert de error

---

### 7. Dashboard Personalizado

#### Test 7.1: Dashboard Solicitante
1. Login como María
2. Dashboard muestra:
   - ✅ Badge azul "Solicitante"
   - ✅ 3 cards de estadísticas: Servicios, Cotizaciones Recibidas, Insumos
   - ✅ 2 botones: Crear Servicio, Solicitar Insumos
   - ✅ Sección "Servicios Recientes" con últimos 3 servicios

#### Test 7.2: Dashboard Proveedor Servicio
1. Login como Juan
2. Dashboard muestra:
   - ✅ Badge azul "Proveedor Servicio"
   - ✅ Estadísticas: Servicios disponibles, Cotizaciones Enviadas
   - ✅ Botón "Ver Servicios Disponibles"

#### Test 7.3: Dashboard Proveedor Insumos
1. Login como Carlos
2. Dashboard muestra:
   - ✅ Badge azul "Proveedor Insumos"
   - ✅ Estadísticas correspondientes
   - ✅ Botón "Gestionar Ofertas"

---

### 8. Navegación y UX

#### Test 8.1: Navegación entre tabs
1. Tocar cada tab: Dashboard → Servicios → Cotizaciones → Login
2. ✅ **Resultado esperado**: 
   - Cambio fluido entre pantallas
   - Tab activo resaltado en azul
   - Iconos cambian correctamente

#### Test 8.2: Navegación stack
1. Dashboard → Crear Servicio
2. Verificar header con título "Crear Servicio"
3. Tap botón "Cancelar" o back
4. ✅ **Resultado esperado**: Vuelve al Dashboard

#### Test 8.3: Navegación con parámetros
1. Servicios → Tap "Enviar Cotización"
2. Verificar que muestra info del servicio correcto
3. ✅ **Resultado esperado**: Datos del servicio coinciden con el seleccionado

---

### 9. Temas Claro/Oscuro

#### Test 9.1: Cambiar tema del sistema
1. Ir a Configuración del dispositivo
2. Cambiar entre modo Claro/Oscuro
3. Volver a la app
4. ✅ **Resultado esperado**: 
   - Colores se adaptan automáticamente
   - Inputs cambian fondo (gris claro → gris oscuro)
   - Texto sigue siendo legible

---

### 10. Validaciones y Feedback

#### Test 10.1: Formularios vacíos
1. Probar enviar cada formulario sin completar
2. ✅ **Resultado esperado**: Alerts descriptivos

#### Test 10.2: Teclados contextuales
1. Crear Servicio → Verificar teclado de texto normal
2. Enviar Cotización (monto) → Verificar teclado numérico
3. Login (email) → Verificar teclado de email
4. ✅ **Resultado esperado**: Teclado correcto en cada campo

#### Test 10.3: Estados vacíos
1. Login como usuario nuevo (sin servicios)
2. Tab "Cotizaciones"
3. ✅ **Resultado esperado**: "No has creado ningún servicio todavía"

---

## 📋 Checklist Completo de Testing

### Funcionalidades Core
- [ ] Login con 3 usuarios diferentes
- [ ] Crear servicio con todas las categorías
- [ ] Listar servicios con scroll
- [ ] Buscar servicios por texto
- [ ] Enviar cotización como proveedor
- [ ] Ver cotizaciones recibidas como solicitante
- [ ] Seleccionar cotización ganadora
- [ ] Solicitar insumo

### Dashboard
- [ ] Estadísticas actualizadas en tiempo real
- [ ] Botones de acción funcionan
- [ ] Servicios recientes se muestran
- [ ] Cambio de rol actualiza vista

### Navegación
- [ ] 4 tabs funcionando
- [ ] Stack navigation hacia/desde formularios
- [ ] Botones de cancelar/volver funcionan
- [ ] Parámetros de URL se pasan correctamente

### UX/UI
- [ ] Temas claro/oscuro
- [ ] Teclados contextuales
- [ ] Alerts con mensajes claros
- [ ] Estados de carga/vacíos
- [ ] Badges de estado con colores correctos
- [ ] Cards con sombra/elevación

### Validaciones
- [ ] Campos obligatorios
- [ ] Formatos numéricos
- [ ] Emails válidos
- [ ] Mensajes de error descriptivos

### Edge Cases
- [ ] Servicio sin cotizaciones
- [ ] Usuario sin servicios creados
- [ ] Múltiples cotizaciones mismo servicio
- [ ] Intentar seleccionar cotización ya seleccionada

---

## 🐛 Bugs Conocidos

Actualmente no hay bugs reportados. Si encuentras alguno durante el testing, por favor documenta:
1. Pasos para reproducir
2. Comportamiento esperado
3. Comportamiento actual
4. Screenshots si es posible

---

## ✅ Criterios de Aceptación

Para que el testing sea exitoso, se debe verificar:

1. **Funcionalidad**: Todas las features del checklist funcionan
2. **Performance**: La app responde en < 1 segundo
3. **UX**: No hay errores visuales, textos se leen bien
4. **Navegación**: Flujos naturales sin bloqueos
5. **Datos**: Estado se mantiene entre navegaciones
6. **Validación**: No se pueden crear datos inválidos

---

**Última actualización**: Noviembre 2025  
**Versión de la app**: 1.0.0  
**Plataformas probadas**: iOS Simulator, Android Emulator, Expo Go
