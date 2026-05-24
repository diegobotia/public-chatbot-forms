'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiRequestError } from '@/types/api'
import { PatientRegistrationResponse } from '@/types/patient'
import { getPatientService } from '@/services/patients/patientServiceFactory'
import { patientRegistrationSchema } from '@/lib/validations/patientRegistrationSchema'
import type { PatientRegistrationFormValues } from '@/lib/validations/patientRegistrationSchema'
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
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { LoadingState } from '@/components/ui/LoadingState'
import { Select } from '@/components/ui/Select'
import { SuccessState } from '@/components/ui/SuccessState'

const initialValues: PatientRegistrationFormValues = {
  email: '',
  nombres: '',
  apellidos: '',
  numIdentificacion: '',
  codTipoIdentificacion: '',
  fechaNacimiento: '',
  idGenero: '',
  idEstadoCivil: '',
  idOcupacion: '',
  idGrupoSanguineo: '',
  idEscolaridad: '',
  estrato: '1',
  idPaisOrigen: '170',
  telefono: '',
  direccionDetalle: '',
  codMunicipio: '',
  codZonaTerritorial: '',
  barrio: '',
}

export const PatientRegistrationForm = () => {
  const patientService = getPatientService()
  const [serverError, setServerError] = useState<string | null>(null)
  const [successResponse, setSuccessResponse] =
    useState<PatientRegistrationResponse | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientRegistrationFormValues>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues: initialValues,
  })

  const onSubmit = async (values: PatientRegistrationFormValues) => {
    setServerError(null)
    setSuccessResponse(null)

    try {
      const payload = {
        ...values,
        estrato: Number(values.estrato),
        idPaisOrigen: Number(values.idPaisOrigen),
      }
      const response = await patientService.registerPatient(payload)
      setSuccessResponse(response)
      reset(initialValues)
    } catch (error) {
      if (error instanceof ApiRequestError) {
        setServerError(error.message)
        return
      }
      setServerError('Error inesperado. Intenta nuevamente en unos minutos.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isSubmitting ? (
        <LoadingState message="Estamos enviando tu registro, por favor espera..." />
      ) : null}

      {successResponse ? (
        <SuccessState
          title="Registro completado"
          description={`${successResponse.message}. Documento: ${successResponse.codTipoIdentificacion}-${successResponse.numIdentificacion}.`}
        />
      ) : null}

      {serverError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Nombres" error={errors.nombres?.message}>
          <Input
            placeholder="Ingresa tus nombres"
            hasError={!!errors.nombres}
            {...register('nombres')}
          />
        </FormField>

        <FormField label="Apellidos" error={errors.apellidos?.message}>
          <Input
            placeholder="Ingresa tus apellidos"
            hasError={!!errors.apellidos}
            {...register('apellidos')}
          />
        </FormField>

        <FormField label="Correo electrónico" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="correo@ejemplo.com"
            hasError={!!errors.email}
            {...register('email')}
          />
        </FormField>

        <FormField label="Teléfono" error={errors.telefono?.message}>
          <Input
            placeholder="3001234567"
            hasError={!!errors.telefono}
            {...register('telefono')}
          />
        </FormField>

        <FormField
          label="Tipo de identificación"
          error={errors.codTipoIdentificacion?.message}
        >
          <Select
            hasError={!!errors.codTipoIdentificacion}
            {...register('codTipoIdentificacion')}
          >
            <option value="">Selecciona una opción</option>
            {documentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Número de identificación"
          error={errors.numIdentificacion?.message}
        >
          <Input
            placeholder="Número de documento"
            hasError={!!errors.numIdentificacion}
            {...register('numIdentificacion')}
          />
        </FormField>

        <FormField
          label="Fecha de nacimiento"
          error={errors.fechaNacimiento?.message}
        >
          <Input
            type="date"
            hasError={!!errors.fechaNacimiento}
            {...register('fechaNacimiento')}
          />
        </FormField>

        <FormField label="Género" error={errors.idGenero?.message}>
          <Select hasError={!!errors.idGenero} {...register('idGenero')}>
            <option value="">Selecciona una opción</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Estado civil" error={errors.idEstadoCivil?.message}>
          <Select hasError={!!errors.idEstadoCivil} {...register('idEstadoCivil')}>
            <option value="">Selecciona una opción</option>
            {maritalStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Ocupación" error={errors.idOcupacion?.message}>
          <Select hasError={!!errors.idOcupacion} {...register('idOcupacion')}>
            <option value="">Selecciona una opción</option>
            {occupationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Grupo sanguíneo"
          error={errors.idGrupoSanguineo?.message}
        >
          <Select
            hasError={!!errors.idGrupoSanguineo}
            {...register('idGrupoSanguineo')}
          >
            <option value="">Selecciona una opción</option>
            {bloodTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Escolaridad" error={errors.idEscolaridad?.message}>
          <Select hasError={!!errors.idEscolaridad} {...register('idEscolaridad')}>
            <option value="">Selecciona una opción</option>
            {educationLevelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Estrato" error={errors.estrato?.message}>
          <Select hasError={!!errors.estrato} {...register('estrato')}>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <option key={value} value={String(value)}>
                {value}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="País de origen" error={errors.idPaisOrigen?.message}>
          <Select hasError={!!errors.idPaisOrigen} {...register('idPaisOrigen')}>
            <option value="">Selecciona una opción</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Municipio" error={errors.codMunicipio?.message}>
          <Select hasError={!!errors.codMunicipio} {...register('codMunicipio')}>
            <option value="">Selecciona una opción</option>
            {municipalityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Zona territorial"
          error={errors.codZonaTerritorial?.message}
        >
          <Select
            hasError={!!errors.codZonaTerritorial}
            {...register('codZonaTerritorial')}
          >
            <option value="">Selecciona una opción</option>
            {territorialZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <div className="md:col-span-2">
          <FormField
            label="Dirección de residencia"
            error={errors.direccionDetalle?.message}
            hint="Incluye calle, número, barrio o referencias."
          >
            <Input
              placeholder="Ej: Calle 45 # 23-10"
              hasError={!!errors.direccionDetalle}
              {...register('direccionDetalle')}
            />
          </FormField>
        </div>

        <FormField label="Barrio (opcional)" error={errors.barrio?.message}>
          <Input placeholder="Ej: Laureles" {...register('barrio')} />
        </FormField>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" loading={isSubmitting}>
          Enviar registro
        </Button>
        <Button
          type="button"
          className="bg-slate-200 text-slate-900 hover:bg-slate-300"
          onClick={() => {
            setServerError(null)
            setSuccessResponse(null)
            reset(initialValues)
          }}
        >
          Limpiar formulario
        </Button>
      </div>
    </form>
  )
}
