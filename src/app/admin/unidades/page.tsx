'use client'

import { University, User as UserIcons } from 'lucide-react'
import Loader from '@/components/Loader'
import { UnitsTable } from './_components/UnitsTable'
import { useEffect, useState } from 'react'
import { useUser } from '@/services/useUser'
import { UnitDialog } from './_components/UnitDialog'
import NoResults from '@/components/NoResults'
import { useUnit } from '@/services/useUnit'

const Page = () => {
  const { units, isLoading, setUnits, getUnits } = useUnit()

  useEffect(() => {
    const fetchUnits = async () => {
      await getUnits()
    }
    fetchUnits()
  }, [])

  return (
    <div className=' flex flex-col relative m-10'>
      <UnitDialog />
      {isLoading ? (
        <Loader />
      ) : units.length === 0 ? (
        <NoResults redirection='/admin' />
      ) : (
        <>
          <div className=' flex flex-col gap-y-2'>
            <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
              <University className='h-9 w-9 mt-1 mr-2' />
              UNIDADES
            </h1>
            <p className='text-sm tracking-wider'>
              Gestiona todos las unidades.
            </p>
          </div>
          <UnitsTable data={units} />
        </>
      )}
    </div>
  )
}

export default Page
