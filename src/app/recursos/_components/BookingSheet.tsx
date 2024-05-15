'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'

const BookingSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className='w-full'>
        <PrimaryButton text='RESERVAR' />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>RESERVA</SheetTitle>
          <SheetDescription>
            Rellena los siguientes datos para completar tu reseva del recurso.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Reservar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingSheet
