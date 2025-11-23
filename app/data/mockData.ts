export const MOCK_USERS = [
  { 
    id: 1, 
    nombre: 'María García', 
    email: 'maria@example.com', 
    password: '123456', 
    role: 'Solicitante',
    rating: 0,
    totalRatings: 0,
  },
  { 
    id: 2, 
    nombre: 'Juan Pérez', 
    email: 'jardin@example.com', 
    password: '123456', 
    role: 'Proveedor Servicio',
    rating: 4.5,
    totalRatings: 12,
  },
  { 
    id: 3, 
    nombre: 'Carlos López', 
    email: 'insumos@example.com', 
    password: '123456', 
    role: 'Proveedor Insumos',
    rating: 0,
    totalRatings: 0,
  },
];

export const INITIAL_SERVICES = [
  {
    id: 1,
    titulo: 'Mantenimiento de Jardín',
    descripcion: 'Se requiere poda de árboles y césped',
    categoria: 'Jardinería',
    ubicacion: 'Montevideo',
    estado: 'PENDIENTE',
    solicitanteId: 1,
  },
  {
    id: 2,
    titulo: 'Reparación de Plomería',
    descripcion: 'Fuga de agua en el baño principal',
    categoria: 'Plomería',
    ubicacion: 'Salto',
    estado: 'PENDIENTE',
    solicitanteId: 1,
  },
];

export const INITIAL_QUOTES = [
  {
    id: 1,
    servicioId: 1,
    proveedorId: 2,
    monto: 15000,
    descripcion: 'Incluye poda de 3 árboles y corte de césped completo',
    estado: 'PENDIENTE',
  },
];

export const INITIAL_SUPPLIES = [
  {
    id: 1,
    nombre: 'Fertilizante orgánico',
    descripcion: 'Necesito 50kg de fertilizante para jardín',
    categoria: 'Jardinería',
    cantidad: 50,
    solicitanteId: 1,
    estado: 'ABIERTO',
  },
];

export const INITIAL_SUPPLY_OFFERS = [
  {
    id: 1,
    insumoId: 1,
    proveedorId: 3,
    precio: 5000,
    estado: 'PENDIENTE',
  },
];
