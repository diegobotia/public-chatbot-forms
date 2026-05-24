import { apiConfig } from '@/config/apiConfig'
import { ApiRequestError } from '@/types/api'

const buildUrl = (path: string): string => {
  const normalizedBase = apiConfig.baseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

const extractErrorMessage = (payload: unknown): string => {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const maybeMessage = (payload as { message?: unknown }).message
    if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
      return maybeMessage
    }
  }
  return 'No fue posible completar la solicitud.'
}

export const httpClient = {
  async post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    const response = await fetch(buildUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response
      .json()
      .catch(() => ({ message: 'Respuesta no válida del servidor.' }))

    if (!response.ok) {
      throw new ApiRequestError(
        extractErrorMessage(data),
        response.status,
        data,
      )
    }

    return data as TResponse
  },
}
