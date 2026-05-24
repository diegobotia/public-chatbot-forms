'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiRequestError } from '@/types/api'
import { PqrsResponse } from '@/types/pqrs'
import { getPqrsService } from '@/services/pqrs/pqrsServiceFactory'
import { pqrsSchema } from '@/lib/validations/pqrsSchema'
import type { PqrsFormValues } from '@/lib/validations/pqrsSchema'
import { pqrsTypeOptions } from '@/mocks/pqrsMockData'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { LoadingState } from '@/components/ui/LoadingState'
import { Select } from '@/components/ui/Select'
import { SuccessState } from '@/components/ui/SuccessState'
import { Textarea } from '@/components/ui/Textarea'

const initialValues: PqrsFormValues = {
  cedula: '',
  tipo: 'PETICION',
  descripcion: '',
  correo: '',
  nombres: '',
  telefono: '',
}

export const PqrsForm = () => {
  const pqrsService = getPqrsService()
  const [serverError, setServerError] = useState<string | null>(null)
  const [successResponse, setSuccessResponse] = useState<PqrsResponse | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PqrsFormValues>({
    resolver: zodResolver(pqrsSchema),
    defaultValues: initialValues,
  })

  const onSubmit = async (values: PqrsFormValues) => {
    setServerError(null)
    setSuccessResponse(null)

    try {
      const { telefono, nombres, ...required } = values
      const payload = {
        ...required,
        telefono: telefono || undefined,
        nombres: nombres || undefined,
      }
      const response = await pqrsService.createPqrs(payload)
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
        <LoadingState message="Estamos registrando tu solicitud, por favor espera..." />
      ) : null}

      {successResponse ? (
        <SuccessState
          title="PQRS registrada"
          description={`Tu solicitud fue registrada con el radicado ${successResponse.radicado}.`}
        />
      ) : null}

      {serverError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Nombres (opcional)" error={errors.nombres?.message}>
          <Input placeholder="Nombre completo" {...register('nombres')} />
        </FormField>

        <FormField label="Correo electrónico" error={errors.correo?.message}>
          <Input
            type="email"
            placeholder="correo@ejemplo.com"
            hasError={!!errors.correo}
            {...register('correo')}
          />
        </FormField>

        <FormField label="Cédula" error={errors.cedula?.message}>
          <Input
            placeholder="Número de documento"
            hasError={!!errors.cedula}
            {...register('cedula')}
          />
        </FormField>

        <FormField label="Teléfono (opcional)" error={errors.telefono?.message}>
          <Input placeholder="3001234567" {...register('telefono')} />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Tipo de solicitud" error={errors.tipo?.message}>
            <Select hasError={!!errors.tipo} {...register('tipo')}>
              {pqrsTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Descripción"
            error={errors.descripcion?.message}
            hint="Describe el detalle de tu solicitud, queja, reclamo o sugerencia."
          >
            <Textarea
              rows={6}
              placeholder="Escribe aquí tu mensaje"
              hasError={!!errors.descripcion}
              {...register('descripcion')}
            />
          </FormField>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" loading={isSubmitting}>
          Enviar PQRS
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
