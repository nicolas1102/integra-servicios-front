'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
// TODO: Hacer bookigitem
// import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
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
