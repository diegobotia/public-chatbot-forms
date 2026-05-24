import {
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from '@/types/patient'
import { ApiRequestError } from '@/types/api'
import { PatientService } from './patientService'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const patientMockService: PatientService = {
  async registerPatient(
    payload: PatientRegistrationRequest,
  ): Promise<PatientRegistrationResponse> {
    await delay(1200)

    if (payload.numIdentificacion === '000000') {
      throw new ApiRequestError(
        'No se pudo registrar el paciente. Verifica los datos e intenta nuevamente.',
        400,
      )
    }

    return {
      patientId: crypto.randomUUID(),
      codTipoIdentificacion: payload.codTipoIdentificacion,
      numIdentificacion: payload.numIdentificacion,
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      email: payload.email,
      message: 'Paciente registrado exitosamente',
      createdAt: new Date().toISOString(),
    }
  },
}
