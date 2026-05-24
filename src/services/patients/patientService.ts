import { apiConfig } from '@/config/apiConfig'
import { httpClient } from '@/lib/httpClient'
import {
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from '@/types/patient'

export interface PatientService {
  registerPatient: (
    payload: PatientRegistrationRequest,
  ) => Promise<PatientRegistrationResponse>
}

export const patientService: PatientService = {
  registerPatient(payload) {
    return httpClient.post<PatientRegistrationResponse, PatientRegistrationRequest>(
      apiConfig.endpoints.patientRegistration,
      payload,
    )
  },
}
