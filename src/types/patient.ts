export interface PatientRegistrationRequest {
  email: string
  nombres: string
  apellidos: string
  numIdentificacion: string
  codTipoIdentificacion: string
  fechaNacimiento: string
  idGenero: string
  idEstadoCivil: string
  idOcupacion: string
  idGrupoSanguineo: string
  idEscolaridad: string
  estrato: number
  idPaisOrigen: number
  telefono: string
  direccionDetalle: string
  codMunicipio: string
  codZonaTerritorial: string
  barrio?: string
}

export interface PatientRegistrationResponse {
  patientId: string
  codTipoIdentificacion: string
  numIdentificacion: string
  nombres: string
  apellidos: string
  email: string
  message: string
  createdAt: string
}

export interface CatalogOptionString {
  value: string
  label: string
}

export interface CatalogOptionNumber {
  value: number
  label: string
}
