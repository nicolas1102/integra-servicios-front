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
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { db } from '@/lib/firebase/clientApp'

const COLLECTION_NAME = 'Unidad'

interface UnitContextType {
  units: UnidadInterface[]
  setUnits: Dispatch<SetStateAction<UnidadInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createUnit: (unit: UnidadInterface) => Promise<UserCredential | undefined>
  getUnits: () => Promise<void>
  // getOneUserByEmail: (
  //   email: string
  // ) => Promise<UserInterface | undefined> | UserInterface
  // updateUser: (
  //   user: UserInterface
  // ) => Promise<AxiosResponse<UserInterface, any> | undefined>
  // deleteUser: (email: string) => Promise<AxiosResponse<any, any> | undefined>
}

const UnitContext = createContext<UnitContextType | null>(null)

export const useUnit = () => {
  const context = useContext(UnitContext)
  if (!context) {
    throw new Error('useUnit must be used within a UserProvider')
  }
  return context
}

export function UnitProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<UnidadInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const createUnit = async (unit: UnidadInterface) => {
    try {
      setIsLoading(true)
      // const res = await createUnitService(unit)
      toast({
        title: 'Unidad creada con exito!',
      })
      return res
    } catch (error: any) {
      console.error('Error creating unit:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar crear unidad! Por favor intentalo de nuevo.',
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

  const getUnits = async () => {
    setIsLoading(true)
    try {
      const documents = collection(db, COLLECTION_NAME)
      onSnapshot(documents, (snapshot) => {
        let unitsData: UnidadInterface[] = []
        snapshot.forEach((doc) => {
          unitsData.push({ ...doc.data(), idUnidad: doc.id } as UnidadInterface)
        })
        setUnits(unitsData)
      })
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los usuarios! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
    <UnitContext.Provider
      value={{
        units: units,
        setUnits: setUnits,
        isLoading,
        setIsLoading,
        getUnits,
        createUnit: createUnit,
        // getUsers,
        // getOneUserByEmail,
        // deleteUser,
        // updateUser,
      }}
    >
      {children}
    </UnitContext.Provider>
  )
}
