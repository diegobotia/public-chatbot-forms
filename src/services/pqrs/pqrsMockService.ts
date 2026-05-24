import { ApiRequestError } from '@/types/api'
import { PqrsRequest, PqrsResponse } from '@/types/pqrs'
import { PqrsService } from './pqrsService'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const pqrsMockService: PqrsService = {
  async createPqrs(payload: PqrsRequest): Promise<PqrsResponse> {
    await delay(1000)

    if (payload.cedula.replaceAll('.', '') === '000000') {
      throw new ApiRequestError(
        'No se pudo registrar la PQRS. Intenta nuevamente.',
        400,
      )
    }

    return {
      radicado: `PQRS-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000,
      )}`,
      status: 'SUBMITTED',
      message: 'Su PQRS ha sido registrada correctamente',
      createdAt: new Date().toISOString(),
      cedula: payload.cedula,
    }
  },
}
