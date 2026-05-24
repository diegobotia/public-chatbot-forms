import { appConfig } from '@/config/appConfig'
import { patientMockService } from './patientMockService'
import { patientService } from './patientService'

export const getPatientService = () =>
  appConfig.useMocks ? patientMockService : patientService
