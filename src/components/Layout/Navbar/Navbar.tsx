'use client'

import NavItem from './NavItem'
import Link from 'next/link'
import { Icons } from '../../Icons'
import ModeToggle from './ModeToggle'
import ProfileNav from './ProfileNav'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <div className='flex flex-col sticky z-50 top-0 inset-x-0 items-center justify-center w-full border-b-2 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='grid grid-cols-4 w-full'>
        <div className='col-span-2 text-center p-1 bg-yellowFPC-400'></div>
        <div className='col-span-1 text-center p-1 bg-blueFPC-400'></div>
        <div className='col-span-1 text-center p-1 bg-redFPC-400'></div>
      </div>

      <div className='flex flex-row justify-between w-full p-1 content-center gap-2'>
        <div className='flex flex-row px-4 py-1'>
          <Link href='/' className='flex flex-row justify-center gap-2'>
            <p className='text-4xl tracking-wider text-center text-primary'>
              INTEGRA
            </p>

            <Icons.logo className=' w-10 h-10 text-yellow-400 hover:-rotate-45 transition-all' />
            <p className='text-4xl tracking-wider text-center text-primary '>
              SERVICIOS
            </p>
          </Link>
        </div>
        <div className='flex flex-row justify-end gap-2 px-1'>
          {session?.rol === 'admin' && (
            <>
              <NavItem title='MENU ADMIN' link='/admin' />
              <span className='border-l border-primary'></span>
            </>
          )}
          {/* {session?.rol === 'user' && (
            <>
              <NavItem title='RECURSOS' link='/recursos' />
              <span className='border-l border-primary'></span>
            </>
          )} */}
          <ProfileNav
            isLoggedIn={Boolean(session)}
            correo={session ? session?.correo : 'Perfil'}
          />
          <span className='border-l border-primary'></span>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
