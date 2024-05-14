import { auth } from '@/lib/firebase/clientApp'
import { signInWithEmailAndPassword } from 'firebase/auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getOneEmployeeByEmailAndPassword } from '@/services/employee.service'

const authOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // lo que esperamos
      credentials: {
        correo: {
          label: 'Correo',
          type: 'text',
          placeholder: 'youremail@gmai.com',
        },
        contraseña: {
          label: 'Contraseña',
          type: 'password',
          placeholder: '**********',
        },
        rol: {
          label: 'Rol',
          type: 'text',
          placeholder: 'user',
        },
      },
      // req son datos adicionales de la aplicación (ejemplo, las cookies)
      async authorize(credentials, req) {
        try {
          const { correo, contraseña, rol } = credentials as {
            correo: string
            contraseña: string
            rol: string
          }
          let userData
          let userLogged
          if (credentials?.rol === 'user') {
            // usamos metodo de firebase para inicio de sesioon
            userData = await signInWithEmailAndPassword(auth, correo, contraseña)
            userLogged = {
              correo: userData.user.email!,
              id: userData.user.uid!,
              rol: rol,
            }
          } else {
            userData = await getOneEmployeeByEmailAndPassword(correo, contraseña)
            userLogged = {
              correo: userData.correo!,
              id: userData.id,
              rol: 'admin',
            }
          }

          if (userData) {
            return userLogged // lo guarda en el token (luego el token lo guarda en la sesión, esto mas abajo en el callback session)
          } else {
            // If response is not ok or does not contain a user token
            throw new Error('No se encontro el token.')
          }
        } catch (e: any) {
          return Promise.reject(new Error(e?.message))
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.correo = user.correo
        token.id = user.id
        token.rol = user.rol
      }
      return token
    },
    // para configurar los datos que se peueden usar en client
    session({ token, session }) {
      if (token) {
        session.correo = token.correo
        session.id = token.id
        session.rol = token.rol
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/log-in',
    signOut: '/auth/log-in',
  },
  session: {
    strategy: 'jwt',
  },
})

export { authOptions as GET, authOptions as POST }
