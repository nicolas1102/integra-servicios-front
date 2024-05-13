import { z } from 'zod'

export const UnitValidator = z.object({
  nombre: z.string().min(1, { message: 'Este campo es necesario.' }),
  tMinPrestamo: z
    .number()
    .min(1, { message: 'La capacidad (número de slots) no puede ser menor o igual a 0.' })
    .max(1000, { message: 'No puede contener más de 1000 slots' }),
  horEntSemInicio: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  horEntSemFin: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  horFinSemInicio: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  horFinSemFin: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
})

export type TUnitValidator = z.infer<typeof UnitValidator>
