import { z } from 'zod'

export const ResourceValidator = z.object({
  nombre: z.string().min(1, { message: 'Este campo es necesario.' }),
  tRecurso: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  ubicacion: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  personas: z
    .number()
    .min(1, { message: 'La capacidad (número de personas) no puede ser menor o igual a 0.' }),
  descripcion: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  prestado: z.boolean()
})

export type TResourceValidator = z.infer<typeof ResourceValidator>
