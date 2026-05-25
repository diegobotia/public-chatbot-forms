import { apiConfig } from '@/config/apiConfig'
import { httpClient } from '@/lib/httpClient'
import {
  PatientRegistrationFormConfigResponse,
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from '@/types/patient'

export interface PatientService {
  getFormConfig: () => Promise<PatientRegistrationFormConfigResponse>
  registerPatient: (
    payload: PatientRegistrationRequest,
  ) => Promise<PatientRegistrationResponse>
}

export const patientService: PatientService = {
  getFormConfig() {
    return httpClient.get<PatientRegistrationFormConfigResponse>(
      apiConfig.endpoints.patientRegistration,
    )
  },

  registerPatient(payload) {
    return httpClient.post<PatientRegistrationResponse, PatientRegistrationRequest>(
      apiConfig.endpoints.patientRegistration,
      payload,
    )
  },
}
