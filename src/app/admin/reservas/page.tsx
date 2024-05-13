'use client'

import { NotebookPen } from 'lucide-react'
import Loader from '@/components/Loader'
import { BookingsTable } from './_components/BookingsTable'
import { useEffect } from 'react'
import NoResults from '@/components/NoResults'
import { useBooking } from '@/services/useBooking'

const Page = () => {
  const { bookings, isLoading, getBookings } = useBooking()

  useEffect(() => {
    const fetchBookings = async () => {
      await getBookings()
    }
    fetchBookings()
  }, [])

  return (
    <div className=' flex flex-col relative m-10'>
      {isLoading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <NoResults redirection='/admin' />
      ) : (
        <>
          <div className=' flex flex-col gap-y-2'>
            <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
              <NotebookPen className='h-9 w-9 mt-1 mr-2' />
              RESERVAS
            </h1>
            <p className='text-sm tracking-wider'>
              Gestiona todas las reservas.
            </p>
          </div>
          <BookingsTable data={bookings} />
        </>
      )}
    </div>
  )
}

export default Page
