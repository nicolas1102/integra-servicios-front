'use client'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { useRouter, useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import { ArrowRight, Check, X } from 'lucide-react'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@/services/useUser'
import Separator from '@/components/Separator'
import ReCAPTCHA from 'react-google-recaptcha'
import { useEffect, useState } from 'react'
import { Toggle } from '@/components/ui/toggle'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoading, setIsLoading, logInUser } = useUser()
  const origin = searchParams.get('callbackUrl')
  const { toast } = useToast()
  const [stateCaptcha, setStateCaptcha] = useState<string | null>(null)
  const [esAdmin, setEsAdmin] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = async ({
    correo,
    contraseña,
    esAdmin,
  }: TAuthCredentialsValidator) => {
    try {
      // if (!stateCaptcha) {
      //   toast({
      //     variant: 'destructive',
      //     title: 'Recuerda llenar el captcha.',
      //   })
      //   return
      // }

      setIsLoading(true)

      // usamos metodo de next-auth para inicio de sesioon
      const res = await logInUser(correo, contraseña, esAdmin ? 'admin' : 'user')

      if (res?.status === 401) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar iniciar sesión! Por favor intentalo de nuevo.',
          description: res.error,
        })
      } else {
        toast({
          title: 'Has iniciado sesión con exito!',
          description:
            'Ahora puedes hacer uso de las funciones de nuestro sistema!',
        })

        // callback a url de origen despues de loguearse correctamente
        if (origin) {
          const url = new URL(origin)
          const path = url.pathname
          return router.push(`${path}`)
        }

        router.push('/')
        router.refresh()
      }
      setIsLoading(false)
    } catch (error: any) {
      console.log('Ocurrió un error al intentar iniciar sesión: ', error)
      toast({
        variant: 'destructive',
        title:
          'Ha ocurrido un error al intentar iniciar sesión! Por favor intentalo de nuevo.',
        description: error.response.data,
      })
    }
  }
  useEffect(() => {
    setValue('esAdmin', esAdmin)
  }, [])

  return (
    <div className='relative flex flex-col items-center justify-center lg:px-0 m-10'>
      <FloatingButton text='REGISTRARSE' href='./sign-up' direction='right' />

      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border border-yellowFPC-400 p-5 bg-background-contrast'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative h-32 w-32 text-muted-foreground'>
            <Icons.logo className='text-yellowFPC-400' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>INGRESA A TU CUENTA</h1>
          <p className='text-sm tracking-wider'>
            Por favor ingresa tu e-mail y tu contraseña.
          </p>
        </div>

        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='correo'>Email</Label>
                <Input
                  {...register('correo')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.correo,
                  })}
                  placeholder='tucorreo@example.com'
                />
                {errors?.correo && (
                  <p className='text-sm text-red-500'>{errors.correo.message}</p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='contraseña'>Contraseña</Label>
                <Input
                  {...register('contraseña')}
                  type='password'
                  className={cn('border-yellowFPC-400', {
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
              <div className='grid gap-1 py-2'>
                <Toggle
                  aria-label='Toggle-role'
                  onPressedChange={() => {
                    setValue('esAdmin', !esAdmin)
                    setEsAdmin(!esAdmin)
                  }}
                  defaultPressed={esAdmin}
                  className='border space-x-2'
                >
                  {esAdmin ? <Check size={19} /> : <X size={19} />}
                  <p className='tracking-widest'>LOGUEARSE COMO ADMIN</p>
                </Toggle>
              </div>

              <PrimaryButton text={'INGRESAR'} isLoading={isLoading} />

              <p className='text-muted-foreground text-center pt-1'>
                Al continuar, estarás aceptando nuestros{' '}
                <span className='underline'>Términos de Servicio</span> y{' '}
                <span className='underline'>Política de Privacidad.</span>
              </p>

              <Separator />
            </div>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href='/auth/sign-up'
              >
                ¿No tienes una cuenta? Registrate!
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
