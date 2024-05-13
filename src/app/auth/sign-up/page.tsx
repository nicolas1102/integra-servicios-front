'use client'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TSignUpCredentialsValidator,
  SignUpCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import Separator from '@/components/Separator'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useUser } from '@/services/useUser'
import { UsuarioInterface } from '@/lib/interfaces/usuario.interface'
import { useEffect } from 'react'

const Page = () => {
  const searchParams = useSearchParams()
  const { isLoading, setIsLoading, createUser } = useUser()
  const correo = searchParams.get('correo')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TSignUpCredentialsValidator>({
    resolver: zodResolver(SignUpCredentialsValidator),
  })

  const onSubmit = async ({
    correo,
    nombre,
    apellido,
    contraseña,
  }: TSignUpCredentialsValidator) => {
    const userData = {
      correo,
      // name,
      // lastname,
      contraseña,
    } as UsuarioInterface
    createUser(userData)
  }

  useEffect(() => {
    if (correo) setValue('correo', correo)
  }, [correo, setValue])

  return (
    <div className='relative flex flex-col items-center justify-center lg:px-0 m-10'>
      <FloatingButton text='INGRESAR' href='/auth/log-in' direction='left' />

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border border-blueFPC-400 p-5 bg-background-contrast'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-32 w-32 text-muted-foreground'>
            <Icons.logo className='text-blueFPC-400' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>REGISTARSE</h1>
          <p className='text-sm tracking-wider'>
            Por favor llena todos los campos.{' '}
          </p>
        </div>

        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='correo'>Email</Label>
                <Input
                  {...register('correo')}
                  className={cn('border-blueFPC-400', {
                    'focus-visible:ring-red-500': errors.correo,
                  })}
                  placeholder='youremail@example.com'
                />
                {errors?.correo && (
                  <p className='text-sm text-red-500'>
                    {errors.correo.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='nombre'>Nombre</Label>
                <Input
                  {...register('nombre')}
                  className={cn('border-blueFPC-400', {
                    'focus-visible:ring-red-500': errors.nombre,
                  })}
                  placeholder='Andrés'
                />
                {errors?.nombre && (
                  <p className='text-sm text-red-500'>
                    {errors.nombre.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='apellido'>Apellido</Label>
                <Input
                  {...register('apellido')}
                  className={cn('border-blueFPC-400', {
                    'focus-visible:ring-red-500': errors.apellido,
                  })}
                  placeholder='Pacheco'
                />
                {errors?.apellido && (
                  <p className='text-sm text-red-500'>
                    {errors.apellido.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='contraseña'>Contraseña</Label>
                <Input
                  {...register('contraseña')}
                  type='password'
                  className={cn('border-blueFPC-400', {
                    'focus-visible:ring-red-500': errors.contraseña,
                  })}
                  placeholder='•••••••'
                />
                {errors?.contraseña && (
                  <p className='text-sm text-red-500'>
                    {errors.contraseña.message}
                  </p>
                )}
              </div>
              <PrimaryButton text={'REGISTRARSE'} isLoading={isLoading} />{' '}
              <p className='text-muted-foreground text-center pt-1'>
                Al continuar, estarás aceptando nuestros{' '}
                <span className='underline'>Términos de Servicio</span> y{' '}
                <span className='underline'>Política de Privacidad.</span>
              </p>
            </div>

            <Separator
              lineColor='border-blueFPC-400'
              coneColor='text-blueFPC-400'
            />
            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href='/auth/log-in'
              >
                <ArrowLeft className='h-4 w-4' />
                ¿Ya tienes una cuenta? Ingresa!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
