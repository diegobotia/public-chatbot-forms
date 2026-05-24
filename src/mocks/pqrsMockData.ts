import { CatalogOptionString } from '@/types/patient'
import { PqrsType } from '@/types/pqrs'

export const pqrsTypeOptions: Array<CatalogOptionString & { value: PqrsType }> = [
  { value: 'PETICION', label: 'Petición' },
  { value: 'QUEJA', label: 'Queja' },
  { value: 'RECLAMO', label: 'Reclamo' },
  { value: 'SUGERENCIA', label: 'Sugerencia' },
]
