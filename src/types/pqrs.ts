export type PqrsType = 'PETICION' | 'QUEJA' | 'RECLAMO' | 'SUGERENCIA'

export interface PqrsRequest {
  cedula: string
  tipo: PqrsType
  descripcion: string
  correo: string
  nombres?: string
  telefono?: string
}

export interface PqrsResponse {
  radicado: string
  status: string
  message: string
  createdAt: string
  cedula: string
}
