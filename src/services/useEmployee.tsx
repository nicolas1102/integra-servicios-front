'use client'

import { UserInterface } from '@/lib/interfaces/usuario.interface'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { signIn, SignInResponse } from 'next-auth/react'
import { auth } from '@/lib/firebase/clientApp'

interface UserContextType {
  users: UserInterface[]
  setUsers: Dispatch<SetStateAction<UserInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createUser: (user: UserInterface) => Promise<UserCredential | undefined>
  // getUsers: () => Promise<void>
  logInUser: (
    email: string,
    password: string,
    role: string
  ) => Promise<SignInResponse | undefined>
}

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const createUser = async (user: UserInterface) => {
    try {
      setIsLoading(true)
      const res = await createUserWithEmailAndPassword(
        auth,
        user.correo,
        user.contraseña!
      )
      router.push('/auth/log-in')
      toast({
        title: 'Te has registrado con exito!',
      })
      return res
    } catch (error: any) {
      console.error('Error creating user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar registrar usuario! Por favor intentalo de nuevo.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logInUser = async (correo: string, contraseña: string, rol: string) => {
    try {
      setIsLoading(true)
      const res = await signIn('credentials', {
        correo,
        contraseña,
        rol,
        redirect: false,
      })
      router.push('/auth/log-in')
      toast({
        title: 'Has iniciado sesión con exito!',
        description:
          'Ahora puedes hacer uso de las funciones de nuestro sistema!',
      })
      return res
    } catch (error: any) {
      console.error('Error creating user:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar iniciar sesión! Por favor intentalo de nuevo.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        isLoading,
        setIsLoading,
        logInUser,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
