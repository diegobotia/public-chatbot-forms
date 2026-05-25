import {
  bloodTypeOptions,
  countryOptions,
  documentTypeOptions,
  educationLevelOptions,
  genderOptions,
  maritalStatusOptions,
  municipalityOptions,
  occupationOptions,
  territorialZoneOptions,
} from '@/mocks/patientMockData'
import {
  PatientRegistrationFormConfigResponse,
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from '@/types/patient'
import { ApiRequestError } from '@/types/api'
import { PatientService } from './patientService'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const patientMockService: PatientService = {
  async getFormConfig(): Promise<PatientRegistrationFormConfigResponse> {
    await delay(300)

    const mapStringOptions = (options: { value: string; label: string }[]) =>
      options.map((option) => ({
        id: option.value,
        label: option.label,
      }))

    return {
      formBaseUrl: 'http://localhost:3000/registro-paciente',
      submitPath: '/api/v1/forms/patients',
      statusPath: '/api/v1/forms/patients/status',
      supportedDocumentTypes: documentTypeOptions.map((option) => ({
        codigo: option.value,
        descripcion: option.label,
      })),
      urlTemplate:
        'http://localhost:3000/registro-paciente?codTipoIdentificacion={codTipoIdentificacion}&numIdentificacion={numIdentificacion}',
      genders: mapStringOptions(genderOptions),
      civilStatus: mapStringOptions(maritalStatusOptions),
      occupations: mapStringOptions(occupationOptions),
      bloodGroups: mapStringOptions(bloodTypeOptions),
      schoolingLevels: mapStringOptions(educationLevelOptions),
      countries: countryOptions.map((option) => ({
        id: String(option.value),
        label: option.label,
      })),
      municipalities: mapStringOptions(municipalityOptions),
      territorialZones: mapStringOptions(territorialZoneOptions),
      catalogs: {
        genders: mapStringOptions(genderOptions),
        civilStatus: mapStringOptions(maritalStatusOptions),
        occupations: mapStringOptions(occupationOptions),
        bloodGroups: mapStringOptions(bloodTypeOptions),
        schoolingLevels: mapStringOptions(educationLevelOptions),
        countries: countryOptions.map((option) => ({
          id: String(option.value),
          label: option.label,
        })),
        municipalities: mapStringOptions(municipalityOptions),
        territorialZones: mapStringOptions(territorialZoneOptions),
      },
    }
  },

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
