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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db, COLLECTION_NAMES } from '@/lib/firebase/clientApp'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { TipoRecursoInterface } from '@/lib/interfaces/tipoRecurso.interface'

interface ResourceContextType {
  resources: RecursoInterface[]
  setResources: Dispatch<SetStateAction<RecursoInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createResource: (resource: RecursoInterface) => Promise<void>
  getResources: () => Promise<void>
  updateResource: (resource: RecursoInterface) => Promise<void>
  deleteResource: (resource: RecursoInterface) => Promise<void>
}

const ResourceContext = createContext<ResourceContextType | null>(null)

export const useResource = () => {
  const context = useContext(ResourceContext)
  if (!context) {
    throw new Error('useResource must be used within a UserProvider')
  }
  return context
}

export function ResourceProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<RecursoInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const createResource = async (resource: RecursoInterface) => {
    try {
      setIsLoading(true)
      const resourceRef = collection(db, COLLECTION_NAMES.RESOURCE)
      await addDoc(resourceRef, resource)
      toast({
        title: 'Recurso creada con exito!',
      })
    } catch (error: any) {
      console.error('Error creating type:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar crear recurso! Por favor intentalo de nuevo.',
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

  const getResources = async () => {
    setIsLoading(true)
    try {
      const resourcesDocs = collection(db, COLLECTION_NAMES.RESOURCE)
      onSnapshot(resourcesDocs, async (snapshot) => {
        let resourcesData: RecursoInterface[] = []
        for (const resourceDoc of snapshot.docs) {
          const resource = resourceDoc.data()

          // obtenemos tipo de recurso para agregar a recurso
          const resourceTypeRef = doc(
            db,
            COLLECTION_NAMES.RESOURCE_TYPE,
            resource.idTRecurso as string
          )
          const resourceTypeDoc = await getDoc(resourceTypeRef)

          // obtenemos unidad para agregar a tipo de recurso
          const unitRef = doc(
            db,
            COLLECTION_NAMES.UNIT,
            resourceTypeDoc.data()?.idUnidad as string
          )
          const unitDoc = await getDoc(unitRef)

          // agregamos unidad a tipo de recurso
          const tRecursoData = {
            ...resourceTypeDoc.data(),
            unidad: {
              ...unitDoc.data(),
              id: unitDoc.id,
            } as UnidadInterface,
            id: resourceTypeDoc.id,
          } as TipoRecursoInterface

          // unimos todo
          resourcesData.push({
            ...resource,
            id: resourceDoc.id,
            tRecurso: tRecursoData,
          } as RecursoInterface)
        }
        setResources(resourcesData)
      })
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los recursos! Por favor intentalo más tarde.',
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

  const updateResource = async (resource: RecursoInterface) => {
    setIsLoading(true)
    try {
      const resourceRef = doc(db, COLLECTION_NAMES.RESOURCE, resource.id!)

      await updateDoc(resourceRef, { ...resource })
      toast({
        title: 'Se actualizó el recurso con éxito!',
        description: '',
      })
    } catch (error: any) {
      console.error('Error updating resource:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo actualizar la información del recurso. Por favor intentalo de nuevo.',
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

  const deleteResource = async (resource: RecursoInterface) => {
    setIsLoading(true)
    try {
      const resourceRef = doc(db, COLLECTION_NAMES.RESOURCE, resource.id!)
      await deleteDoc(resourceRef)
      toast({
        title: 'Se eliminó la recurso con éxito!',
        description: '',
      })
    } catch (error: any) {
      console.error('Error deleting resource:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'No se pudo eliminar el recurso. Por favor intentalo de nuevo.',
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
    <ResourceContext.Provider
      value={{
        resources: resources,
        setResources,
        isLoading,
        setIsLoading,
        getResources,
        createResource,
        deleteResource,
        updateResource,
      }}
    >
      {children}
    </ResourceContext.Provider>
  )
}
