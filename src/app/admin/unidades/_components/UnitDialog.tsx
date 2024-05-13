'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Separator from '@/components/Separator'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { useUnit } from '@/services/useUnit'
import { TUnitValidator, UnitValidator } from '@/lib/validators/unit-validators'

export function UnitDialog({ unit }: { unit?: UnidadInterface }) {
  const router = useRouter()
  const { updateUnit, isLoading, getUnits, createUnit } = useUnit()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TUnitValidator>({
    resolver: zodResolver(UnitValidator),
  })
  const onSubmit = async ({
    nombre,
    tMinPrestamo,
    horEntSemInicio,
    horEntSemFin,
    horFinSemInicio,
    horFinSemFin,
  }: TUnitValidator) => {
    const unitData = {
      nombre,
      tMinPrestamo,
      horEntSem: {
        inicio: horEntSemInicio,
        fin: horEntSemFin,
      },
      horFinSem: {
        inicio: horFinSemInicio,
        fin: horFinSemFin,
      },
    } as UnidadInterface
    if (unit) unitData.id = unit.id
    try {
      unit ? updateUnit(unitData) : createUnit(unitData)
      clearForm()
      router.push('/admin/unidades')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (unit) {
      setValue('nombre', unit.nombre)
      setValue('tMinPrestamo', unit.tMinPrestamo)
      setValue('horEntSemInicio', unit.horEntSem.inicio)
      setValue('horEntSemFin', unit.horEntSem.fin)
      setValue('horFinSemInicio', unit.horFinSem.inicio)
      setValue('horFinSemFin', unit.horFinSem.fin)
    } else {
      setValue('tMinPrestamo', 0)
      setValue('horEntSemInicio', '00:00')
      setValue('horEntSemFin', '00:00')
      setValue('horFinSemInicio', '00:00')
      setValue('horFinSemFin', '00:00')
    }
  }, [])

  const clearForm = () => {
    setValue('nombre', '')
    setValue('tMinPrestamo', 0)
    setValue('horEntSemInicio', '00:00')
    setValue('horEntSemFin', '00:00')
    setValue('horFinSemInicio', '00:00')
    setValue('horFinSemFin', '00:00')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!unit ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer'>
            CREAR UNIDAD
          </div>
        ) : (
          <div className='relative flex cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
            <p>Editar unidad</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!unit ? 'CREAR UNIDAD' : 'EDITAR UNIDAD'}
            </p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes crear una nueva unidad en nuestro sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='firstName'>Nombre</Label>
              <Input
                {...register('nombre')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.nombre,
                })}
                placeholder='Ingeniería'
              />
              {errors?.nombre && (
                <p className='text-sm text-red-500'>{errors.nombre.message}</p>
              )}
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='tMinPrestamo'>Tiempo Mínimo de Prestamo</Label>
              <Input
                {...register('tMinPrestamo', { valueAsNumber: true })}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.tMinPrestamo,
                })}
                placeholder='30 min'
              />
              {errors?.tMinPrestamo && (
                <p className='text-sm text-red-500'>
                  {errors.tMinPrestamo.message}
                </p>
              )}
            </div>

            <Separator lineColor='border-yellowFPC-400' />

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='horEntSemInicio'>Inicio Hora Entre Sem.</Label>
                <Input
                  {...register('horEntSemInicio')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.horEntSemInicio,
                  })}
                  type='time'
                />
                {errors?.horEntSemInicio && (
                  <p className='text-sm text-red-500'>
                    {errors.horEntSemInicio.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='horEntSemFin'>Fin Hora Entre Sem.</Label>
                <Input
                  {...register('horEntSemFin')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.horEntSemFin,
                  })}
                  type='time'
                />
                {errors?.horEntSemFin && (
                  <p className='text-sm text-red-500'>
                    {errors.horEntSemFin.message}
                  </p>
                )}
              </div>
            </div>

            <div className='grid gap-2 justify-around grid-cols-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='horFinSemInicio'>Inicio Hora Fin de Sem.</Label>
                <Input
                  {...register('horFinSemInicio')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.horFinSemInicio,
                  })}
                  type='time'
                />
                {errors?.horFinSemInicio && (
                  <p className='text-sm text-red-500'>
                    {errors.horFinSemInicio.message}
                  </p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='horFinSemFin'>Fin Hora Fin de Sem.</Label>
                <Input
                  {...register('horFinSemFin')}
                  className={cn('border-yellowFPC-400', {
                    'focus-visible:ring-red-500': errors.horFinSemFin,
                  })}
                  type='time'
                />
                {errors?.horFinSemFin && (
                  <p className='text-sm text-red-500'>
                    {errors.horFinSemFin.message}
                  </p>
                )}
              </div>
            </div>

            <PrimaryButton
              text={unit ? 'CONFIRMAR CAMBIOS UNIDAD' : 'CREAR UNIDAD'}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
