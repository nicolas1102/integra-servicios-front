'use client'

import { BookType, Laptop } from 'lucide-react'
import Loader from '@/components/Loader'
import { ResourcesTable } from './_components/ResourcesTable'
import { useEffect } from 'react'
import { ResourceDialog } from './_components/ResourceDialog'
import NoResults from '@/components/NoResults'
import { useResource } from '@/services/useResource'

const Page = () => {
  const { resources, isLoading, getResources } =
    useResource()

  useEffect(() => {
    const fetchResources = async () => {
      await getResources()
    }
    fetchResources()
  }, [])

  return (
    <div className=' flex flex-col relative m-10'>
      <ResourceDialog />
      {isLoading ? (
        <Loader />
      ) : resources.length === 0 ? (
        <NoResults redirection='/admin' />
      ) : (
        <>
          <div className=' flex flex-col gap-y-2'>
            <h1 className='text-3xl font-normal tracking-wider text-primary sm:text-4xl inline-flex'>
              <Laptop className='h-9 w-9 mt-1 mr-2' />
              RECURSOS
            </h1>
            <p className='text-sm tracking-wider'>
              Gestiona todos los recursos.
            </p>
          </div>
          <ResourcesTable data={resources} />
        </>
      )}
    </div>
  )
}

export default Page
