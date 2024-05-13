import { z } from 'zod'

export const ResourceTypeValidator = z.object({
  nombre: z.string().min(1, { message: 'Este campo es necesario.' }),
  descripcion: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  unidad: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  horEntSemLunInicio: z.string(),
  horEntSemLunFin: z.string(),
  horEntSemMarInicio: z.string(),
  horEntSemMarFin: z.string(),
  horEntSemMierInicio: z.string(),
  horEntSemMierFin: z.string(),
  horEntSemJueInicio: z.string(),
  horEntSemJueFin: z.string(),
  horEntSemVierInicio: z.string(),
  horEntSemVierFin: z.string(),
  horFinSemSabInicio: z.string(),
  horFinSemSabFin: z.string(),
  horFinSemDogInicio: z.string(),
  horFinSemDogFin: z.string(),
})

export type TResourceTypeValidator = z.infer<typeof ResourceTypeValidator>
