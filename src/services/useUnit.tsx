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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { db } from '@/lib/firebase/clientApp'

const COLLECTION_NAME = 'Unidad'

interface UnitContextType {
  units: UnidadInterface[]
  setUnits: Dispatch<SetStateAction<UnidadInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createUnit: (unit: UnidadInterface) => void
  getUnits: () => Promise<void>
  getOneUnit: (id: string) => Promise<UnidadInterface>
  updateUnit: (unit: UnidadInterface) => void
  deleteUnit: (unit: UnidadInterface) => void
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
      const unitRef = collection(db, COLLECTION_NAME)
      const unitData = await addDoc(unitRef, unit)
      toast({
        title: 'Unidad creada con exito!',
      })
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
      onSnapshot(documents, async (snapshot) => {
        let unitsData: UnidadInterface[] = []
        for (const doc of snapshot.docs) {
          unitsData.push({ ...doc.data(), id: doc.id } as UnidadInterface)
        }
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

  const updateUnit = async (unit: UnidadInterface) => {
    setIsLoading(true)
    try {
      const unitRef = doc(db, COLLECTION_NAME, unit.id!)
      await updateDoc(unitRef, { ...unit })
      toast({
        title: 'Se actualizó la unidad con éxito!',
        description: '',
      })
    } catch (error: any) {
      console.error('Error deleting unit:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la información del unidad. Por favor intentalo de nuevo.',
          description: error.response.data,
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

  const deleteUnit = async (unit: UnidadInterface) => {
    setIsLoading(true)
    try {
      const unitRef = doc(db, COLLECTION_NAME, unit.id!)
      await deleteDoc(unitRef)
      toast({
        title: 'Se eliminó la unidad con éxito!',
        description: '',
      })
    } catch (error: any) {
      console.error('Error deleting unit:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title: 'No se pudo eliminar la unidad. Por favor intentalo de nuevo.',
          description: error.response.data,
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

  const getOneUnit = async (id: string) => {
    const unitRef = doc(db, COLLECTION_NAME, id)
    const unit = await getDoc(unitRef)
    if (unit.exists()) {
      return unit.data() as UnidadInterface
    } else {
      throw new Error('Credenciales invalidas.')
    }
  }

  return (
    <UnitContext.Provider
      value={{
        units,
        setUnits,
        isLoading,
        setIsLoading,
        getUnits,
        getOneUnit,
        createUnit,
        deleteUnit,
        updateUnit,
      }}
    >
      {children}
    </UnitContext.Provider>
  )
}
