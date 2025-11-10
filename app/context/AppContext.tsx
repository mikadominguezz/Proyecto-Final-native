import React, { createContext, useContext, useReducer } from "react";
import {
  MOCK_USERS,
  INITIAL_SERVICES,
  INITIAL_QUOTES,
  INITIAL_SUPPLIES,
  INITIAL_SUPPLY_OFFERS,
} from "../data/mockData";

interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  role: string;
}

interface Service {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string;
  solicitanteId: number;
  cotizacionSeleccionadaId?: number;
}

interface Quote {
  id: number;
  servicioId: number;
  proveedorId: number;
  monto: number;
  descripcion: string;
  estado: string;
}

interface Supply {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  solicitanteId: number;
  estado: string;
}

interface SupplyOffer {
  id: number;
  insumoId: number;
  proveedorId: number;
  precio: number;
  estado: string;
}

interface AppState {
  currentUser: User | null;
  users: User[];
  services: Service[];
  quotes: Quote[];
  supplies: Supply[];
  supplyOffers: SupplyOffer[];
}

type AppAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "ADD_SERVICE"; payload: Service }
  | { type: "UPDATE_SERVICE"; payload: Service }
  | { type: "ADD_QUOTE"; payload: Quote }
  | { type: "UPDATE_QUOTE"; payload: Quote }
  | { type: "DELETE_QUOTE"; payload: number }
  | { type: "ADD_SUPPLY"; payload: Supply }
  | { type: "UPDATE_SUPPLY"; payload: Supply }
  | { type: "DELETE_SUPPLY"; payload: number }
  | { type: "ADD_SUPPLY_OFFER"; payload: SupplyOffer }
  | { type: "SELECT_QUOTE"; payload: { serviceId: number; quoteId: number } };

const initialState: AppState = {
  currentUser: null,
  users: MOCK_USERS,
  services: INITIAL_SERVICES,
  quotes: INITIAL_QUOTES,
  supplies: INITIAL_SUPPLIES,
  supplyOffers: INITIAL_SUPPLY_OFFERS,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    
    case "LOGOUT":
      return { ...state, currentUser: null };
    
    case "ADD_SERVICE":
      return { ...state, services: [...state.services, action.payload] };
    
    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    
    case "ADD_QUOTE":
      return { ...state, quotes: [...state.quotes, action.payload] };
    
    case "UPDATE_QUOTE":
      return {
        ...state,
        quotes: state.quotes.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };
    
    case "DELETE_QUOTE":
      return {
        ...state,
        quotes: state.quotes.filter((q) => q.id !== action.payload),
      };
    
    case "ADD_SUPPLY":
      return { ...state, supplies: [...state.supplies, action.payload] };
    
    case "UPDATE_SUPPLY":
      return {
        ...state,
        supplies: state.supplies.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    
    case "DELETE_SUPPLY":
      return {
        ...state,
        supplies: state.supplies.filter((s) => s.id !== action.payload),
      };
    
    case "ADD_SUPPLY_OFFER":
      return {
        ...state,
        supplyOffers: [...state.supplyOffers, action.payload],
      };
    
    case "SELECT_QUOTE":
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload.serviceId
            ? {
                ...s,
                estado: "ASIGNADO",
                cotizacionSeleccionadaId: action.payload.quoteId,
              }
            : s
        ),
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de AppProvider");
  }
  return context;
}
