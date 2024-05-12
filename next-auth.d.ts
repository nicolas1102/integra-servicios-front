import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  // Configuracion de token
  interface JWT {
    correo: string,
    rol: string,
    id: string,
  }
}
declare module "next-auth" {
  // Configuracion de session
  interface Session {
    correo: string,
    rol: string,
    id: string,
  }

  interface User extends DefaultUser {
    correo: string,
    rol: string,
    id: string,
  }
}
