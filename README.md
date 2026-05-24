# Formularios públicos para chatbot (IPS)

Proyecto frontend en Next.js para dos formularios públicos:

- Registro mínimo de paciente: `/registro-paciente`
- Creación de PQRS: `/pqrs`

El proyecto soporta dos modos:

- Modo mock (sin backend)
- Modo real (con backend configurable por variable de entorno)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod

## Instalación y ejecución local

1. Instala dependencias:

```bash
npm install
```

2. Crea archivo `.env.local` a partir de `.env.example`:

```bash
cp .env.example .env.local
```

3. Ejecuta el proyecto:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000)

## Variables de entorno

Archivo `.env.example`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_USE_MOCKS=true
```

### Modo mock

```env
NEXT_PUBLIC_USE_MOCKS=true
```

- No consume backend.
- Simula respuestas exitosas y errores controlados.
- Para probar error en UI:
  - Registro paciente: usar `numIdentificacion = 000000`
  - PQRS: usar `cedula = 000000`

### Modo backend real local

```env
NEXT_PUBLIC_USE_MOCKS=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Modo backend desplegado

```env
NEXT_PUBLIC_USE_MOCKS=false
NEXT_PUBLIC_API_BASE_URL=https://api.mi-proyecto.com
```

También puedes usar una URL temporal (ngrok, cloudflare tunnel):

```env
NEXT_PUBLIC_API_BASE_URL=https://mi-backend.ngrok-free.app
```

## Endpoints utilizados

- Registro mínimo de paciente:
  - `POST /api/v1/forms/patients`
- Creación de PQRS:
  - `POST /api/v1/forms/pqrs`

Los paths están centralizados en `src/config/apiConfig.ts`.

## Rutas públicas para el chatbot

Comparte estas rutas públicas desde el chatbot:

- `/registro-paciente`
- `/pqrs`

## Estructura principal

```text
src/
  app/
  components/
  config/
  lib/
  mocks/
  services/
  styles/
  types/
```

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Configura variables de entorno en Vercel:
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_USE_MOCKS`
4. Deploy.

No requiere configuración adicional especial.

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: build de producción
- `npm run start`: iniciar build en producción
- `npm run lint`: lint del proyecto
