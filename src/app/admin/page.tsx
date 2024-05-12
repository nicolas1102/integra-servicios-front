'use client'

import { useSession } from 'next-auth/react'
import AdminFunctionItem from './_components/AdminFunctionItem'
import { BookType, LineChart, ParkingSquare, University, User } from 'lucide-react'

const FUNCTIONS = [
  {
    title: 'GESTIONAR UNIDADES',
    text: 'Gestiona todos las unidades del sistema.',
    link: '/admin/unidades',
    icon: <University strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
  {
    title: 'GESTIONAR TIPO DE RECURSOS',
    text: 'Gestiona todos los tipos de recursos del sistema.',
    link: '/admin/tipos-recursos',
    icon: <BookType strokeWidth={0.9} className='h-32 w-32 mx-auto' />,
  },
]

const Page = () => {
  const { data: session } = useSession()
  return (
    <div className='max-h-full flex flex-col gap-y-10 m-10'>
      <div className='flex flex-col'>
        <div className='pb-7'>
          <h1 className='text-4xl tracking-widest pb-1'>MENU ADMINISTRADOR</h1>
          <p className='text-base uppercase'>
            Este es el menu de administrador.
          </p>
        </div>
        <div className='flex flex-row flex-wrap gap-5'>
          {FUNCTIONS.map((item, index) => (
            <AdminFunctionItem
              title={item.title}
              text={item.text}
              link={item.link}
              icon={item.icon}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
