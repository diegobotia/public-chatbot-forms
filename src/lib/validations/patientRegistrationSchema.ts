import { z } from 'zod'

export const patientRegistrationSchema = z.object({
  email: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .email('Ingresa un correo electrónico válido.'),
  nombres: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .min(2, 'Debe tener al menos 2 caracteres.'),
  apellidos: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .min(2, 'Debe tener al menos 2 caracteres.'),
  numIdentificacion: z.string().min(1, 'El número de documento no puede estar vacío.'),
  codTipoIdentificacion: z.string().min(1, 'Este campo es obligatorio.'),
  fechaNacimiento: z.string().min(1, 'Este campo es obligatorio.'),
  idGenero: z.string().min(1, 'Este campo es obligatorio.'),
  idEstadoCivil: z.string().min(1, 'Este campo es obligatorio.'),
  idOcupacion: z.string().min(1, 'Este campo es obligatorio.'),
  idGrupoSanguineo: z.string().min(1, 'Este campo es obligatorio.'),
  idEscolaridad: z.string().min(1, 'Este campo es obligatorio.'),
  estrato: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .regex(/^[1-6]$/, 'Debe ser un valor entre 1 y 6.'),
  idPaisOrigen: z.string().min(1, 'Este campo es obligatorio.'),
  telefono: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .regex(/^\+?[0-9]{7,15}$/, 'Ingresa un teléfono válido.'),
  direccionDetalle: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .min(10, 'La dirección debe tener al menos 10 caracteres.'),
  codMunicipio: z.string().min(1, 'Este campo es obligatorio.'),
  codZonaTerritorial: z.string().min(1, 'Este campo es obligatorio.'),
  barrio: z.string().max(100, 'Máximo 100 caracteres.').optional(),
})

export type PatientRegistrationFormValues = z.infer<
  typeof patientRegistrationSchema
>
