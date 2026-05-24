export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080',
  endpoints: {
    patientRegistration: '/api/v1/forms/patients',
    pqrs: '/api/v1/forms/pqrs',
  },
} as const
