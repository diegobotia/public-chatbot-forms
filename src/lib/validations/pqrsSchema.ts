import { z } from 'zod'

export const pqrsSchema = z.object({
  cedula: z
    .string()
    .min(1, 'El número de documento no puede estar vacío.')
    .regex(/^[0-9]{8,10}$/, 'La cédula debe tener entre 8 y 10 dígitos numéricos.'),
  tipo: z.enum(['PETICION', 'QUEJA', 'RECLAMO', 'SUGERENCIA'], {
    message: 'Este campo es obligatorio.',
  }),
  descripcion: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .min(10, 'La descripción debe tener al menos 10 caracteres.')
    .max(2000, 'La descripción no puede superar 2000 caracteres.'),
  correo: z
    .string()
    .min(1, 'Este campo es obligatorio.')
    .email('Ingresa un correo electrónico válido.'),
  nombres: z.string().optional(),
  telefono: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, 'Ingresa un teléfono válido.')
    .optional()
    .or(z.literal('')),
})

export type PqrsFormValues = z.infer<typeof pqrsSchema>
