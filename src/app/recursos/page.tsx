'use client'

import { Laptop } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ResourceItem from './_components/ResourceItem'
import { Input } from '@/components/ui/input'
import { useResourcesFilters } from './_hooks/useResourcesFilters'
import { useResource } from '@/services/useResource'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { Toggle } from '@/components/ui/toggle'
import { CustomTooltip } from '@/components/CustomTooltip'
import FloatingButton from '@/components/CustomButtons/FloatingButton'

export default function Home() {
  const {
    filterUnit,
    setFilterUnit,
    filterName,
    setFilterName,
    filterResourceType,
    setFilterResourceType,
    filterLocation,
    setFilterLocation,
    filterBorrowed,
    setFilterBorrowed,
    filterMonday,
    setFilterMonday,
    filterTuesday,
    setFilterTuesday,
    filterWednesday,
    setFilterWednesday,
    filterThursday,
    setFilterThursday,
    filterFriday,
    setFilterFriday,
    filterSaturday,
    setFilterSaturday,
    filterSunday,
    setFilterSunday,
    filteredResources,
  } = useResourcesFilters()
  const { resources, isLoading, getResources } = useResource()

  const [selectedResource, setSelectedResource] =
    useState<RecursoInterface | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      await getResources()
    }
    fetchResources()
  }, [])
  return (
    <div>
      <div className='py-2 px-4 border-b flex flex-row gap-3'>
        <h1 className='text-2xl tracking-widest font-normal flex content-center gap-x-2'>
          <Laptop size={35} />
          RECURSOS
        </h1>
        <span className='border-l border-primary h-auto'></span>
        <div className='flex flex-row gap-2'>
          <div>
            <Input
              onChange={(e) => {
                setFilterName(e.target.value)
              }}
              placeholder='Filtrar por nombre'
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                setFilterUnit(e.target.value)
              }}
              placeholder='Filtrar por unidad'
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                setFilterLocation(e.target.value)
              }}
              placeholder='Filtrar por ubicacion'
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                setFilterResourceType(e.target.value)
              }}
              placeholder='Filtrar por tipo recurso'
            />
          </div>

          <span className='border-l border-primary h-auto'></span>

          <div className='flex items-center gap-1'>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterMonday(!filterMonday)
                }}
                defaultPressed={filterMonday}
                className='border'
              >
                <CustomTooltip text='Lunes'>
                  <p className=' font-bold'>Lun</p>
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterTuesday(!filterTuesday)
                }}
                defaultPressed={filterTuesday}
                className='border'
              >
                <CustomTooltip text='Martes'>
                  <p className=' font-bold'>Mar</p>
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterWednesday(!filterWednesday)
                }}
                defaultPressed={filterWednesday}
                className='border'
              >
                <CustomTooltip text='Miercoles'>
                  <p className=' font-bold'>Mie</p>
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterThursday(!filterThursday)
                }}
                defaultPressed={filterThursday}
                className='border'
              >
                <CustomTooltip text='Jueves'>
                  <p className=' font-bold'>Jue</p>
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterFriday(!filterFriday)
                }}
                defaultPressed={filterFriday}
                className='border'
              >
                <CustomTooltip text='Viernes'>
                  <p className=' font-bold'>Vie</p>
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterSaturday(!filterSaturday)
                }}
                defaultPressed={filterSaturday}
                className='border'
              >
                <CustomTooltip text='Sabado'>
                  <p className=' font-bold'>Sab</p>
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-monday'
                onPressedChange={() => {
                  setFilterSunday(!filterSunday)
                }}
                defaultPressed={filterSunday}
                className='border'
              >
                <CustomTooltip text='Domingo'>
                  <p className=' font-bold'>Dom</p>
                </CustomTooltip>
              </Toggle>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-7 px-28 py-5'>
        <p className='mb-4 px-3'>Selecciona el recurso que necesites.</p>
        {/* <FloatingButton
          text='Prueba reservando en Los Bazuqueros'
          href='/recursos-los-bazuqueros'
          direction='right'
        /> */}
        <ScrollArea className='h-[620px]'>
          {filteredResources.length !== 0 ? (
            <div className='grid grid-cols-3 gap-2 pr-3'>
              {filteredResources.map((resourceItem) => (
                <ResourceItem
                  key={resourceItem.id}
                  resourceData={resourceItem}
                  setSelectedResource={setSelectedResource}
                  isSelected={resourceItem.id === selectedResource?.id}
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
  )
}
