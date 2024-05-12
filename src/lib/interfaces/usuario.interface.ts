import { CreditCard } from './creditCard.model'
import { RoleType } from './role.interface'

export interface UserInterface {
  id?: number
  correo: string
  contraseña?: string
  ip?: string
  nombre?: string
  apellido?: string
  rol: string
}
