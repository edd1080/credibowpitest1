# Features Directory

Esta carpeta contiene toda la lógica organizada por dominio de negocio siguiendo Feature-Driven Architecture.

## Estructura de cada Feature

Cada feature sigue la siguiente estructura estándar:

```
features/[feature-name]/
├── components/     # Componentes específicos de la feature
├── screens/        # Pantallas principales de la feature
├── hooks/          # Hooks personalizados específicos
├── services/       # Lógica de negocio y llamadas API
└── types/          # Interfaces y tipos TypeScript
```

## Features Actuales

### 🔐 Auth (`features/auth/`)
- Manejo de autenticación y autorización
- Login, registro, recuperación de contraseña
- Gestión de sesiones y tokens

### 🎯 Onboarding (`features/onboarding/`)
- Introducción y tutorial de la aplicación
- Slides de bienvenida y configuración inicial

### 📊 Dashboard (`features/dashboard/`)
- Pantalla principal con métricas y resumen
- Tarjetas de estadísticas y accesos rápidos

### 📋 Applications (`features/applications/`)
- Gestión completa de solicitudes de crédito
- Lista, detalles, creación y edición de solicitudes

### 🔔 Alerts (`features/alerts/`)
- Sistema de notificaciones y alertas
- Gestión de estados leído/no leído

### ⚙️ Settings (`features/settings/`)
- Configuración de la aplicación
- Preferencias de usuario y ajustes del sistema

## Principios de Organización

1. **Separación por dominio**: Cada feature es independiente
2. **Reutilización**: Componentes compartidos en `components/shared/`
3. **Tipado fuerte**: Interfaces bien definidas en `types/`
4. **Servicios separados**: Lógica de negocio en `services/`
5. **Hooks específicos**: Lógica de estado en `hooks/`