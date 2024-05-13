'use client'

import { BookType } from 'lucide-react'
import Loader from '@/components/Loader'
import { ResourceTypesTable } from './_components/ResourceTypesTable'
import { useEffect } from 'react'
import { ResourceTypeDialog } from './_components/ResourceTypeDialog'
import NoResults from '@/components/NoResults'
import { useResourceType } from '@/services/useResourceType'

const Page = () => {
  const { resourceTypes, isLoading, getResourceTypes } =
    useResourceType()

  useEffect(() => {
    const fetchResourceTypes = async () => {
      await getResourceTypes()
    }
    fetchResourceTypes()
  }, [])

  return (
    <div className=' flex flex-col relative m-10'>
      <ResourceTypeDialog />
      {isLoading ? (
        <Loader />
      ) : resourceTypes.length === 0 ? (
        <NoResults redirection='/admin' />
      ) : (
        <>
          <div className=' flex flex-col gap-y-2'>
            <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
              <BookType className='h-9 w-9 mt-1 mr-2' />
              TIPOS DE RECURSO
            </h1>
            <p className='text-sm tracking-wider'>
              Gestiona todos los tipos de recurso.
            </p>
          </div>
          <ResourceTypesTable data={resourceTypes} />
        </>
      )}
    </div>
  )
}

export default Page
