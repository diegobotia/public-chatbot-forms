import { apiConfig } from '@/config/apiConfig'
import { ApiRequestError } from '@/types/api'

const buildUrl = (path: string): string => {
  const normalizedBase = apiConfig.baseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

const extractErrorMessage = (payload: unknown): string => {
  if (Array.isArray(payload) && payload.length > 0) {
    const firstMessageFromArray = extractErrorMessage(payload[0])
    if (firstMessageFromArray !== 'No fue posible completar la solicitud.') {
      return firstMessageFromArray
    }
  }

  if (payload && typeof payload === 'object' && 'message' in payload) {
    const maybeMessage = (payload as { message?: unknown }).message
    if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
      return maybeMessage
    }
  }
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const maybeError = (payload as { error?: unknown }).error
    if (typeof maybeError === 'string' && maybeError.trim().length > 0) {
      return maybeError
    }
  }

  if (payload && typeof payload === 'object') {
    const values = Object.values(payload as Record<string, unknown>)
    for (const value of values) {
      if (typeof value === 'string' && value.trim().length > 0) {
        return value
      }
      const nestedMessage = extractErrorMessage(value)
      if (nestedMessage !== 'No fue posible completar la solicitud.') {
        return nestedMessage
      }
    }
  }

  return 'No fue posible completar la solicitud.'
}

export const httpClient = {
  async post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    let response: Response
    try {
      response = await fetch(buildUrl(path), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    } catch (error) {
      throw new ApiRequestError(
        'No fue posible conectar con el servidor. Verifica la URL del backend y la configuración de CORS.',
        0,
        error,
      )
    }

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
