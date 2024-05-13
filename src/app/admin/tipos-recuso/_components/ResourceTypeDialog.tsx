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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Separator from '@/components/Separator'
import { TipoRecursoInterface } from '@/lib/interfaces/tipoRecurso.interface'
import { useResourceType } from '@/services/useResourceType'
import {
  TResourceTypeValidator,
  ResourceTypeValidator,
} from '@/lib/validators/resourceType-validators'
import { UnitSelect } from './UnitSelect'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'

export function ResourceTypeDialog({
  resourceType,
}: {
  resourceType?: TipoRecursoInterface
}) {
  const [unit, setUnit] = useState<UnidadInterface | null>(null)
  const { updateResourceType, isLoading, createResourceType } =
    useResourceType()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TResourceTypeValidator>({
    resolver: zodResolver(ResourceTypeValidator),
  })
  const onSubmit = async ({
    nombre,
    unidad,
    descripcion,
    horEntSemLunInicio,
    horEntSemLunFin,
    horEntSemMarInicio,
    horEntSemMarFin,
    horEntSemMierInicio,
    horEntSemMierFin,
    horEntSemJueInicio,
    horEntSemJueFin,
    horEntSemVierInicio,
    horEntSemVierFin,
    horFinSemSabInicio,
    horFinSemSabFin,
    horFinSemDogInicio,
    horFinSemDogFin,
  }: TResourceTypeValidator) => {
    const resourceTypeData = {
      nombre,
      descripcion,
      idUnidad: unidad,
      horEntSem: [],
      horFinSem: [],
    } as TipoRecursoInterface

    if (resourceType) resourceTypeData.id = resourceType.id

    if (horEntSemLunInicio !== horEntSemLunFin) {
      resourceTypeData.horEntSem.push({
        dia: 'Lunes',
        hora_inicio: horEntSemLunInicio,
        hora_fin: horEntSemLunFin,
      })
    }
    if (horEntSemMarInicio !== horEntSemMarFin) {
      resourceTypeData.horEntSem.push({
        dia: 'Martes',
        hora_inicio: horEntSemMarInicio,
        hora_fin: horEntSemMarFin,
      })
    }
    if (horEntSemMierInicio !== horEntSemMierFin) {
      resourceTypeData.horEntSem.push({
        dia: 'Miercoles',
        hora_inicio: horEntSemMierInicio,
        hora_fin: horEntSemMierFin,
      })
    }
    if (horEntSemJueInicio !== horEntSemJueFin) {
      resourceTypeData.horEntSem.push({
        dia: 'Jueves',
        hora_inicio: horEntSemJueInicio,
        hora_fin: horEntSemJueFin,
      })
    }
    if (horEntSemVierInicio !== horEntSemVierFin) {
      resourceTypeData.horEntSem.push({
        dia: 'Viernes',
        hora_inicio: horEntSemVierInicio,
        hora_fin: horEntSemVierFin,
      })
    }
    if (horFinSemSabInicio !== horFinSemSabFin) {
      resourceTypeData.horFinSem.push({
        dia: 'Sabado',
        hora_inicio: horFinSemSabInicio,
        hora_fin: horFinSemSabFin,
      })
    }
    if (horFinSemDogInicio !== horFinSemDogFin) {
      resourceTypeData.horFinSem.push({
        dia: 'Domingo',
        hora_inicio: horFinSemDogInicio,
        hora_fin: horFinSemDogFin,
      })
    }

    try {
      resourceType
        ? updateResourceType(resourceTypeData)
        : createResourceType(resourceTypeData)
      clearForm()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (resourceType) {
      setValue('nombre', resourceType.nombre)
      setValue('descripcion', resourceType.descripcion)
      if (resourceType.horEntSem[0])
        setValue('horEntSemLunInicio', resourceType.horEntSem[0].hora_inicio)
      if (resourceType.horEntSem[0])
        setValue('horEntSemLunFin', resourceType.horEntSem[0].hora_fin)
      if (resourceType.horEntSem[1])
        setValue('horEntSemMarInicio', resourceType.horEntSem[1].hora_inicio)
      if (resourceType.horEntSem[1])
        setValue('horEntSemMarFin', resourceType.horEntSem[1].hora_fin)
      if (resourceType.horEntSem[2])
        setValue('horEntSemMierInicio', resourceType.horEntSem[2].hora_inicio)
      if (resourceType.horEntSem[2])
        setValue('horEntSemMierFin', resourceType.horEntSem[2].hora_fin)
      if (resourceType.horEntSem[3])
        setValue('horEntSemJueInicio', resourceType.horEntSem[3].hora_inicio)
      if (resourceType.horEntSem[3])
        setValue('horEntSemJueFin', resourceType.horEntSem[3].hora_fin)
      if (resourceType.horEntSem[4])
        setValue('horEntSemVierInicio', resourceType.horEntSem[4].hora_inicio)
      if (resourceType.horEntSem[4])
        setValue('horEntSemVierFin', resourceType.horEntSem[4].hora_fin)
      if (resourceType.horFinSem[0])
        setValue('horFinSemSabInicio', resourceType.horFinSem[0].hora_inicio)
      if (resourceType.horFinSem[0])
        setValue('horFinSemSabFin', resourceType.horFinSem[0].hora_fin)
      if (resourceType.horFinSem[1])
        setValue('horFinSemDogInicio', resourceType.horFinSem[1].hora_inicio)
      if (resourceType.horFinSem[1])
        setValue('horFinSemDogFin', resourceType.horFinSem[1].hora_fin)
      setUnit(resourceType ? resourceType.unidad! : null)
    } else {
      setValue('horEntSemLunInicio', '00:00')
      setValue('horEntSemLunFin', '00:00')
      setValue('horEntSemMarInicio', '00:00')
      setValue('horEntSemMarFin', '00:00')
      setValue('horEntSemMierInicio', '00:00')
      setValue('horEntSemMierFin', '00:00')
      setValue('horEntSemJueInicio', '00:00')
      setValue('horEntSemJueFin', '00:00')
      setValue('horEntSemVierInicio', '00:00')
      setValue('horEntSemVierFin', '00:00')
      setValue('horFinSemSabInicio', '00:00')
      setValue('horFinSemSabFin', '00:00')
      setValue('horFinSemDogInicio', '00:00')
      setValue('horFinSemDogFin', '00:00')
    }
  }, [])

  useEffect(() => {
    setValue('unidad', unit ? unit.id! : '')
  }, [unit])

  const clearForm = () => {
    setValue('nombre', '')
    setValue('descripcion', '')
    setValue('horEntSemLunInicio', '00:00')
    setValue('horEntSemLunFin', '00:00')
    setValue('horEntSemMarInicio', '00:00')
    setValue('horEntSemMarFin', '00:00')
    setValue('horEntSemMierInicio', '00:00')
    setValue('horEntSemMierFin', '00:00')
    setValue('horEntSemJueInicio', '00:00')
    setValue('horEntSemJueFin', '00:00')
    setValue('horEntSemVierInicio', '00:00')
    setValue('horEntSemVierFin', '00:00')
    setValue('horFinSemSabInicio', '00:00')
    setValue('horFinSemSabFin', '00:00')
    setValue('horFinSemDogInicio', '00:00')
    setValue('horFinSemDogFin', '00:00')
    setUnit(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!resourceType ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer'>
            CREAR TIPO DE RECURSO
          </div>
        ) : (
          <div className='relative flex cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
            <p>Editar tipo de recurso</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!resourceType
                ? 'CREAR TIPO DE RECURSO'
                : 'EDITAR TIPO DE RECURSO'}
            </p>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-2'>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='firstName'>Nombre</Label>
              <Input
                {...register('nombre')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.nombre,
                })}
                placeholder='Aulas'
              />
              {errors?.nombre && (
                <p className='text-sm text-red-500'>{errors.nombre.message}</p>
              )}
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='descripcion'>Descripción</Label>
              <Input
                {...register('descripcion')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.descripcion,
                })}
                placeholder='Espacios fisicos para estudiantes'
              />
              {errors?.descripcion && (
                <p className='text-sm text-red-500'>
                  {errors.descripcion.message}
                </p>
              )}
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='unidad'>Unidad</Label>
              <UnitSelect
                unit={unit}
                setUnit={setUnit}
                errors={errors.unidad}
              />
              {errors?.unidad && (
                <p className='text-sm text-red-500'>{errors.unidad.message}</p>
              )}
            </div>

            <div className='grid gap-1 py-1'>
              <Label htmlFor='horEntSemLunInicio'>Horario Lunes</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horEntSemLunInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horEntSemLunFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='horEntSemMar'>Horario Martes</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horEntSemMarInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horEntSemMarFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='horEntSemMier'>Horario Miercoles</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horEntSemMierInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horEntSemMierFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='horEntSemJue'>Horario Jueves</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horEntSemJueInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horEntSemJueFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='horEntSemVier'>Horario Lunes</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horEntSemVierInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horEntSemVierFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='horFinSemSab'>Horario Sabado</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horFinSemSabInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horFinSemSabFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='horFinSemDog'>Horario Doming0</Label>
              <div className='grid gap-2 justify-around grid-cols-2'>
                <Input
                  {...register('horFinSemDogInicio')}
                  className='border-yellowFPC-400'
                  type='time'
                />
                <Input
                  {...register('horFinSemDogFin')}
                  className='border-yellowFPC-400'
                  type='time'
                />
              </div>
            </div>

            <PrimaryButton
              text={resourceType ? 'CONFIRMAR CAMBIOS UNIDAD' : 'CREAR UNIDAD'}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
