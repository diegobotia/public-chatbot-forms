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

export interface PatientCatalogOptionDTO {
  id: string
  label: string
}

export interface PatientDocumentTypeOptionDTO {
  codigo: string
  descripcion: string
}

export interface PatientRegistrationFormConfigResponse {
  formBaseUrl: string
  submitPath: string
  statusPath: string
  supportedDocumentTypes: PatientDocumentTypeOptionDTO[]
  urlTemplate: string
  genders: PatientCatalogOptionDTO[]
  civilStatus: PatientCatalogOptionDTO[]
  occupations: PatientCatalogOptionDTO[]
  bloodGroups: PatientCatalogOptionDTO[]
  schoolingLevels: PatientCatalogOptionDTO[]
  countries: PatientCatalogOptionDTO[]
  municipalities: PatientCatalogOptionDTO[]
  territorialZones: PatientCatalogOptionDTO[]
  catalogs: Record<string, PatientCatalogOptionDTO[]>
}
