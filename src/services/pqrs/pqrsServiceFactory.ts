import { appConfig } from '@/config/appConfig'
import { pqrsMockService } from './pqrsMockService'
import { pqrsService } from './pqrsService'

export const getPqrsService = () =>
  appConfig.useMocks ? pqrsMockService : pqrsService
