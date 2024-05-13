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
import { ReservaInterface } from '@/lib/interfaces/reserva.interface'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { UsuarioInterface } from '@/lib/interfaces/usuario.interface'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'

interface BookingContextType {
  bookings: ReservaInterface[]
  setBookings: Dispatch<SetStateAction<ReservaInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  createBooking: (booking: ReservaInterface) => Promise<void>
  getBookings: () => Promise<void>
}

const BookingContext = createContext<BookingContextType | null>(null)

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a UserProvider')
  }
  return context
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<ReservaInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const createBooking = async (booking: ReservaInterface) => {
    try {
      setIsLoading(true)
      const bookingRef = collection(db, COLLECTION_NAMES.BOOKING)
      await addDoc(bookingRef, booking)
      toast({
        title: 'Reserva creada con exito!',
      })
    } catch (error: any) {
      console.error('Error creating type:', error)
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar crear reserva! Por favor intentalo de nuevo.',
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

  const getBookings = async () => {
    setIsLoading(true)
    try {
      const bookingsDocs = collection(db, COLLECTION_NAMES.BOOKING)
      onSnapshot(bookingsDocs, async (snapshot) => {
        let bookingsData: ReservaInterface[] = []
        for (const bookingDoc of snapshot.docs) {
          const booking = bookingDoc.data() as ReservaInterface

          // obtenemos usuario para agregar a reserva
          const userRef = doc(
            db,
            COLLECTION_NAMES.USER,
            booking.idUsuario as string
          )
          const userDoc = await getDoc(userRef)

          // obtenemos recurso para agregar a reserva
          const resourceRef = doc(
            db,
            COLLECTION_NAMES.RESOURCE,
            booking.idRecurso as string
          )
          const resourceDoc = await getDoc(resourceRef)

          // unimos todo
          bookingsData.push({
            ...booking,
            id: bookingDoc.id,
            usuario: {
              ...userDoc.data(),
              id: userDoc.id,
            } as UsuarioInterface,
            recurso: {
              ...resourceDoc.data(),
              id: resourceDoc.id,
            } as RecursoInterface,
          } as ReservaInterface)
        }
        setBookings(bookingsData)
      })
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los reservas! Por favor intentalo más tarde.',
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
    <BookingContext.Provider
      value={{
        bookings: bookings,
        setBookings,
        isLoading,
        setIsLoading,
        getBookings,
        createBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
