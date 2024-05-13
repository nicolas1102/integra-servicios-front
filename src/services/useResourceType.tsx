'use client'

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
import { COLLECTION_NAMES, db } from '@/lib/firebase/clientApp'
import { TipoRecursoInterface } from '@/lib/interfaces/tipoRecurso.interface'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'

interface ResourceTypeContextType {
  resourceTypes: TipoRecursoInterface[]
  setResourceTypes: Dispatch<SetStateAction<TipoRecursoInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createResourceType: (resourceType: TipoRecursoInterface) => Promise<void>
  getResourceTypes: () => Promise<void>
  updateResourceType: (resourceType: TipoRecursoInterface) => Promise<void>
  deleteResourceType: (resourceType: TipoRecursoInterface) => Promise<void>
}

const ResourceTypeContext = createContext<ResourceTypeContextType | null>(null)

export const useResourceType = () => {
  const context = useContext(ResourceTypeContext)
  if (!context) {
    throw new Error('useResourceType must be used within a UserProvider')
  }
  return context
}

export function ResourceTypeProvider({ children }: { children: ReactNode }) {
  const [resourceTypes, setResourceTypes] = useState<TipoRecursoInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const createResourceType = async (resourceType: TipoRecursoInterface) => {
    try {
      setIsLoading(true)
      const resourceTypeRef = collection(db, COLLECTION_NAMES.RESOURCE_TYPE)
      await addDoc(resourceTypeRef, resourceType)
      toast({
        title: 'Tipo de Recurso creada con exito!',
      })
    } catch (error: any) {
      console.error('Error creating resource Type:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar crear tipo de recurso! Por favor intentalo de nuevo.',
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

  const getResourceTypes = async () => {
    setIsLoading(true)
    try {
      const resourceTypesDocs = collection(db, COLLECTION_NAMES.RESOURCE_TYPE)
      onSnapshot(resourceTypesDocs, async (snapshot) => {
        let resourceTypesData: TipoRecursoInterface[] = []
        for (const resourceTypeDoc of snapshot.docs) {
          const resourceType = resourceTypeDoc.data()

          const unitRef = doc(
            db,
            COLLECTION_NAMES.UNIT,
            resourceType.idUnidad as string
          )
          const unitDoc = await getDoc(unitRef)

          resourceTypesData.push({
            ...resourceType,
            id: resourceTypeDoc.id,
            unidad: { ...unitDoc.data(), id: unitDoc.id } as UnidadInterface,
          } as TipoRecursoInterface)
        }
        setResourceTypes(resourceTypesData)
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

  const updateResourceType = async (resourceType: TipoRecursoInterface) => {
    setIsLoading(true)
    try {
      const resourceTypeRef = doc(
        db,
        COLLECTION_NAMES.RESOURCE_TYPE,
        resourceType.id!
      )
      delete resourceType.id
      await updateDoc(resourceTypeRef, { ...resourceType })
      toast({
        title: 'Se actualizó la tipo de recurso con éxito!',
        description: '',
      })
    } catch (error: any) {
      console.error('Error updating resourceType:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la información del tipo de recurso. Por favor intentalo de nuevo.',
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

  const deleteResourceType = async (resourceType: TipoRecursoInterface) => {
    setIsLoading(true)
    try {
      const resourceTypeRef = doc(
        db,
        COLLECTION_NAMES.RESOURCE_TYPE,
        resourceType.id!
      )
      await deleteDoc(resourceTypeRef)
      toast({
        title: 'Se eliminó la tipo de recurso con éxito!',
        description: '',
      })
    } catch (error: any) {
      console.error('Error deleting resourceType:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo eliminar la tipo de recurso. Por favor intentalo de nuevo.',
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

  return (
    <ResourceTypeContext.Provider
      value={{
        resourceTypes: resourceTypes,
        setResourceTypes,
        isLoading,
        setIsLoading,
        getResourceTypes,
        createResourceType,
        deleteResourceType,
        updateResourceType,
      }}
    >
      {children}
    </ResourceTypeContext.Provider>
  )
}
