export const apiConfig = {
  // The browser should call same-origin routes; Next route handlers proxy to backend.
  baseUrl: '',
  endpoints: {
    patientRegistration: '/api/v1/forms/patients',
    pqrs: '/api/v1/forms/pqrs',
  },
} as const
