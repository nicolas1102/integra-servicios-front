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
import { RecursoBazuquerosInterface } from '@/lib/interfaces/recursoBazuqueros.interface'
import { getLosBazuquerosResourcesRequest } from '@/app/api/routers/bazuqueros.router'

interface BazuquerosResourceContextType {
  bazuquerosResources: RecursoBazuquerosInterface[]
  setBazuquerosResources: Dispatch<SetStateAction<RecursoBazuquerosInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  getBazuquerosResource: () => Promise<void>
}

const BazuquerosResourceContext =
  createContext<BazuquerosResourceContextType | null>(null)

export const useBazuquerosResource = () => {
  const context = useContext(BazuquerosResourceContext)
  if (!context) {
    throw new Error('useBazuquerosResource must be used within a UserProvider')
  }
  return context
}

export function BazuquerosResourceProvider({
  children,
}: {
  children: ReactNode
}) {
  const [bazuquerosResources, setBazuquerosResources] = useState<
    RecursoBazuquerosInterface[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getBazuquerosResource = async () => {
    setIsLoading(true)
    try {
      const res = await getLosBazuquerosResourcesRequest()
      setBazuquerosResources(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los recursos de los Bazuqueros! Por favor intentalo más tarde.',
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

  return (
    <BazuquerosResourceContext.Provider
      value={{
        bazuquerosResources,
        setBazuquerosResources,
        isLoading,
        setIsLoading,
        getBazuquerosResource,
      }}
    >
      {children}
    </BazuquerosResourceContext.Provider>
  )
}
