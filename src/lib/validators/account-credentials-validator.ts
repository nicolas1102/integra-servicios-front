import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  correo: z.string().email({ message: 'Dirección de email invalida.' }),
  contraseña: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
  esAdmin: z.boolean()
})

export const SignUpCredentialsValidator = z.object({
  correo: z.string().email({ message: 'Dirección de email invalida.' }),
  nombre: z.string().min(1, { message: 'Este campo es necesario.' }),
  apellido: z
    .string()
    .min(1, { message: 'Este campo es necesario.' }),
  contraseña: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
});

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>