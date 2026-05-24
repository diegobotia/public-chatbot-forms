import { apiConfig } from '@/config/apiConfig'
import { httpClient } from '@/lib/httpClient'
import { PqrsRequest, PqrsResponse } from '@/types/pqrs'

export interface PqrsService {
  createPqrs: (payload: PqrsRequest) => Promise<PqrsResponse>
}

export const pqrsService: PqrsService = {
  createPqrs(payload) {
    return httpClient.post<PqrsResponse, PqrsRequest>(
      apiConfig.endpoints.pqrs,
      payload,
    )
  },
}
