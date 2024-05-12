// validaciones del lado del cliente

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

export const ChangePasswordCredentialsValidator = z.object({
  email: z.string().email({ message: 'Dirección de email invalida.' }),
  oldPassword: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
  newPassword: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
  confirmPassword: z
    .string()
    .min(5, { message: 'Recuerda que la contraseña debe tener mínimo 5 caracteres.' })
    .max(8, { message: 'Recuerda que la contraseña debe tener máximo 8 caracteres.' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseña no son iguales.",
  path: ["confirmPassword"],
});

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>

export type TChangePasswordCredentialsValidator = z.infer<typeof ChangePasswordCredentialsValidator>