# MeParqueo — App móvil

App móvil para conductores que encuentra parqueaderos con disponibilidad en tiempo real en Montería, Colombia: mapa en vivo, búsqueda de destino, filtros y navegación hasta el parqueadero.

## Parte del ecosistema MeParqueo

MeParqueo es un sistema IoT de parqueo inteligente en tiempo real. Repos de la organización:

| Repo | Rol |
| ---- | --- |
| **[app-meparqueo](https://github.com/bambai-labs/app-meparqueo)** (este repo) | App móvil React Native para conductores |
| [api-meparqueo](https://github.com/bambai-labs/api-meparqueo) (público) | Backend — API REST + Socket.IO que consume esta app |
| [nodo-meparqueo](https://github.com/bambai-labs/nodo-meparqueo) (público) | Firmware del sensor ESP32 (LoRaWAN) |
| [web-meparqueo](https://github.com/bambai-labs/web-meparqueo) (público) | Frontend web |
| [landing-meparqueo](https://github.com/bambai-labs/landing-meparqueo) (público) | Landing page |
| [survey-meparqueo](https://github.com/bambai-labs/survey-meparqueo) (público) | Encuestas y validación |

## ✨ Características

- **Mapa en vivo con Mapbox**: parqueaderos cercanos con su disponibilidad codificada por color.
- **Disponibilidad en tiempo real**: cliente Socket.IO que escucha `parkingUpdateStatus` y actualiza el estado de cada parqueadero al instante.
- **Búsqueda de destino** con Google Places API y parqueaderos cercanos al punto elegido.
- **Filtros**: radio de búsqueda, solo disponibles, pago por transferencia, valet parking y 24/7.
- **Navegación y contacto**: abre la ruta en Google Maps / Apple Maps y permite llamar al parqueadero.
- **Sesión anónima por dispositivo**: UUID local + JWT contra `/api/v1/auth/client`, con refresh automático ante 401 (interceptor de Axios).
- **Parqueaderos recientes, reportes y calificaciones**, con recordatorio de reseña vía notificación programada.
- **Actualización forzada**: compara la versión del cliente contra `/api/v1/config/version` y redirige a una pantalla de app desactualizada; también maneja pantalla sin conexión.
- **Banners y patrocinadores** dinámicos desde la API.
- **Firebase Analytics + Crashlytics** y notificaciones push con `expo-notifications`.

## 🛠️ Stack

- React Native 0.76 + Expo SDK 52 (Expo Router, EAS Build/Submit/Updates)
- TypeScript
- Redux Toolkit + React Redux
- gluestack-ui + NativeWind (Tailwind CSS)
- Mapbox (`@rnmapbox/maps`)
- Socket.IO client + Axios
- Firebase (Analytics, Crashlytics)
- Formik + Yup · Jest (`jest-expo`)

## 📁 Estructura del proyecto

```
api/         Clientes Axios y Socket.IO + tipos de respuesta de la API
app/         Rutas con Expo Router (home, search, allparkinglots, outdated, nointernet)
assets/      Fuentes (Neuwelt) e imágenes (pines del mapa, splash, íconos)
components/  Componentes UI base (gluestack-ui) y componentes compartidos
constants/   Colores del tema
data/        Datos mock
hooks/       Hooks de tema y color scheme
modules/     Features por dominio: home, common, nointernet, nopermissions
store/       Slices de Redux Toolkit (auth, location, parking, search, review, bottomsheet)
android/     Proyecto nativo Android (Gradle/Kotlin)
scripts/     Utilidades (reset-project)
```

## 🚀 Desarrollo local

```bash
yarn install
cp .env.example .env   # completa las variables
yarn start             # servidor de desarrollo Expo
yarn android           # compilar y correr en Android
yarn ios               # compilar y correr en iOS
yarn test              # tests con Jest
yarn lint              # linting
```

Variables de entorno (ver `.env.example`):

- `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN`
- `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`
- `EXPO_PUBLIC_MEPARQUEO_API`

Los perfiles de EAS usan además `EXPO_PUBLIC_DEV_MODE` para distinguir dev/prod.

### Builds con EAS

```bash
eas build -p android --profile production   # AAB para Play Store
eas build -p android --profile preview      # APK interno
eas build -p ios --profile production
eas submit -p ios
```

Más detalles en [`build-guide.md`](./build-guide.md).

## 👥 Hecho por bambai-labs

Desarrollado por el equipo de [bambai-labs](https://github.com/bambai-labs).
