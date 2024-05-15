'use client'

import { Laptop } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import BazuquerosResourceItem from './_components/BazuquerosResourceItem'
import { Input } from '@/components/ui/input'
import { useResource } from '@/services/useResource'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { Toggle } from '@/components/ui/toggle'
import { CustomTooltip } from '@/components/CustomTooltip'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { useBazuquerosResource } from '@/services/useBazuquerosResource'
import { RecursoBazuquerosInterface } from '@/lib/interfaces/recursoBazuqueros.interface'

export default function Home() {
  const { bazuquerosResources, isLoading, getBazuquerosResource } =
    useBazuquerosResource()

  const [selectedBazuquerosResource, setSelectedBazuquerosResource] =
    useState<RecursoBazuquerosInterface | null>(null)

  useEffect(() => {
    const fetchBazuquerosResource = async () => {
      await getBazuquerosResource()
    }
    fetchBazuquerosResource()
  }, [])
  return (
    <div className='relative'>
      <div className='py-2 px-4 border-b flex flex-row gap-3'>
        <h1 className='text-2xl tracking-widest font-normal flex content-center gap-x-2'>
          <Laptop size={35} />
          RECURSOS - LOS BAZUQUEROS
        </h1>
      </div>

      <div className='col-span-7 px-28 py-10'>
        <div className=' relative'>
          <FloatingButton
            text='Volver a recursos de Fantastic 4 Plus One'
            href='/recursos'
            direction='left'
          />
        </div>
        <div className='pt-16'>
          <p className='mb-4'>Selecciona el recurso que necesites.</p>
          <ScrollArea className='h-[620px]'>
            {bazuquerosResources.length !== 0 ? (
              <div className='grid grid-cols-3 gap-2'>
                {bazuquerosResources.map((bazuquerosResourceItem) => (
                  <BazuquerosResourceItem
                    key={bazuquerosResourceItem.id}
                    bazuquerosResourceItemData={bazuquerosResourceItem}
                    setSelectedBazuquerosResourceItem={
                      setSelectedBazuquerosResource
                    }
                    isSelected={
                      bazuquerosResourceItem.id ===
                      selectedBazuquerosResource?.id
                    }
                  />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center w-full h-full py-14'>
                <p className='text-xl tracking-widest'>
                  NO HAY RESULTADOS DE RECURSOS.
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
