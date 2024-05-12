'use client'

import {
  createUserService,
  getAuthorizedUserRequest,
} from '@/services/users.service'
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
import { UserCredential } from 'firebase/auth'
import { SignInResponse } from 'next-auth/react'
import { doc, getDoc } from 'firebase/firestore'

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
  // getOneUserByEmail: (
  //   email: string
  // ) => Promise<UserInterface | undefined> | UserInterface
  // updateUser: (
  //   user: UserInterface
  // ) => Promise<AxiosResponse<UserInterface, any> | undefined>
  // deleteUser: (email: string) => Promise<AxiosResponse<any, any> | undefined>
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
      const res = await createUserService(user)
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

  // const getUsers = async () => {
  //   setIsLoading(true)
  //   try {
  //     const res = await getUsersRequest()
  //     setUsers(res.data)
  //   } catch (error: any) {
  //     if (error?.response?.data) {
  //       toast({
  //         variant: 'destructive',
  //         title:
  //           'Ha ocurrido un error al intentar obtener los usuarios! Por favor intentalo más tarde.',
  //         description: error?.response.data,
  //       })
  //     } else {
  //       toast({
  //         variant: 'destructive',
  //         title: 'No se ha podido conectar con el servidor.',
  //         description: 'Intentalo más tarde.',
  //       })
  //     }
  //     console.error('Error fetching users:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const logInUser = async (email: string, password: string, role: string) => {
    try {
      setIsLoading(true)
      const res = await getAuthorizedUserRequest(email, password, role)
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

  // const getOneUserByEmail = async (email: string) => {
  //   try {
  //     setIsLoading(true)
  //     const res = await getOneUserByEmailRequest(email)
  //     toast({
  //       title: 'Se obtuvo la información del usuario con exito!',
  //       description: '',
  //     })
  //     return res.data as UserInterface
  //   } catch (error: any) {
  //     if (error?.response?.data) {
  //       toast({
  //         variant: 'destructive',
  //         title:
  //           'Ha ocurrido un error al intentar obtener los datos del usuario! Por favor intentalo más tarde.',
  //         description: error?.response.data,
  //       })
  //     } else {
  //       toast({
  //         variant: 'destructive',
  //         title: 'No se ha podido conectar con el servidor.',
  //         description: 'Intentalo más tarde.',
  //       })
  //     }
  //     console.error('Error fetching user:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const updateUser = async (user: UserInterface) => {
  //   setIsLoading(true)
  //   try {
  //     const res = await updateUserRequest(user)
  //     setUsers((prevUsers) => {
  //       const userIndex = prevUsers.findIndex(
  //         (userItem) => userItem.email === user.email
  //       )
  //       const updatedUsers = [...prevUsers]
  //       updatedUsers[userIndex] = user
  //       return updatedUsers
  //     })
  //     toast({
  //       title: 'Se actualizó la información del usuario con éxito!',
  //       description: '',
  //     })
  //     return res as AxiosResponse<any, any>
  //   } catch (error: any) {
  //     console.error('Error deleting user:', error)
  //     if (error?.response?.data) {
  //       toast({
  //         variant: 'destructive',
  //         title:
  //           'No se pudo actualizar la información del usuario. Por favor intentalo de nuevo.',
  //         description: error.response.data,
  //       })
  //     } else {
  //       toast({
  //         variant: 'destructive',
  //         title: 'No se ha podido conectar con el servidor.',
  //         description: 'Intentalo más tarde.',
  //       })
  //     }
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const deleteUser = async (email: string) => {
  //   setIsLoading(true)
  //   try {
  //     const res = await deleteUserRequest(email)
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email))
  //     toast({
  //       title: 'Se eliminó el usuario con éxito!',
  //       description: '',
  //     })
  //     return res
  //   } catch (error: any) {
  //     console.error('Error deleting user:', error)
  //     if (error?.response?.data) {
  //       toast({
  //         variant: 'destructive',
  //         title:
  //           'No se pudo eliminar el usuario. Por favor intentalo de nuevo.',
  //         description: error.response.data,
  //       })
  //     } else {
  //       toast({
  //         variant: 'destructive',
  //         title: 'No se ha podido conectar con el servidor.',
  //         description: 'Intentalo más tarde.',
  //       })
  //     }
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        isLoading,
        setIsLoading,
        logInUser,
        createUser,
        // getUsers,
        // getOneUserByEmail,
        // deleteUser,
        // updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
