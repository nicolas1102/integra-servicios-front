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
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { useResource } from '@/services/useResource'
import {
  TResourceValidator,
  ResourceValidator,
} from '@/lib/validators/resource-validators'
import { ResourceTypeSelect } from './ResourceTypeSelect'
import { TipoRecursoInterface } from '@/lib/interfaces/tipoRecurso.interface'
import { Toggle } from '@/components/ui/toggle'
import { Check, X } from 'lucide-react'

export function ResourceDialog({ resource }: { resource?: RecursoInterface }) {
  const [tResourse, setTResourse] = useState<TipoRecursoInterface | null>(null)
  const [estaPrestado, setEstaPrestado] = useState(false)
  const { updateResource, isLoading, createResource } = useResource()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TResourceValidator>({
    resolver: zodResolver(ResourceValidator),
  })
  const onSubmit = async ({
    nombre,
    tRecurso,
    ubicacion,
    personas,
    descripcion,
    prestado,
  }: TResourceValidator) => {
    const resourceData = {
      nombre,
      idTRecurso: tRecurso,
      caracteristicas: {
        ubicacion,
        personas,
        descripcion,
      },
      prestado,
    } as RecursoInterface

    if (resource) resourceData.id = resource.id
    try {
      resource ? updateResource(resourceData) : createResource(resourceData)
      clearForm()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (resource) {
      setValue('nombre', resource.nombre)
      setValue('ubicacion', resource.caracteristicas.ubicacion)
      setValue('personas', resource.caracteristicas.personas)
      setValue('descripcion', resource.caracteristicas.descripcion)
      setValue('prestado', resource.prestado)
      setEstaPrestado(resource.prestado)
      setTResourse(resource ? resource.tRecurso! : null)
    } else {
      setValue('prestado', false)
      setValue('personas', 0)
    }
  }, [])

  useEffect(() => {
    setValue('tRecurso', tResourse ? tResourse.id! : '')
  }, [tResourse])

  const clearForm = () => {
    setValue('nombre', '')
    setValue('ubicacion', '')
    setValue('personas', 0)
    setValue('descripcion', '')
    setValue('prestado', false)
    setTResourse(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!resource ? (
          <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 absolute top-0 z-10 tracking-widest border hover:bg-yellowFPC-200  dark:hover:bg-yellowFPC-400 dark:hover:text-black hover:border-primary right-2 md:right-0 cursor-pointer'>
            CREAR RECURSO
          </div>
        ) : (
          <div className='relative flex cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
            <p>Editar recurso</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            <p className='tracking-widest'>
              {!resource ? 'CREAR RECURSO' : 'EDITAR RECURSO'}
            </p>
          </DialogTitle>
          <DialogDescription>
            Aquí puedes crear un nuevo recurso en nuestro sistema.
          </DialogDescription>
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
                placeholder='Computador Portatil'
              />
              {errors?.nombre && (
                <p className='text-sm text-red-500'>{errors.nombre.message}</p>
              )}
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='tRecurso'>Tipo Recurso</Label>
              <ResourceTypeSelect
                tResourse={tResourse}
                setTResourse={setTResourse}
                errors={errors.tRecurso}
              />
              {errors?.tRecurso && (
                <p className='text-sm text-red-500'>
                  {errors.tRecurso.message}
                </p>
              )}
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='ubicacion'>Ubicación</Label>
              <Input
                {...register('ubicacion')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.ubicacion,
                })}
                placeholder='Biblioteca'
              />
              {errors?.ubicacion && (
                <p className='text-sm text-red-500'>
                  {errors.ubicacion.message}
                </p>
              )}
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='descripcion'>Descripción</Label>
              <Input
                {...register('descripcion')}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.descripcion,
                })}
                placeholder='Computadores portatiles para el uso en la biblioteca'
              />
              {errors?.descripcion && (
                <p className='text-sm text-red-500'>
                  {errors.descripcion.message}
                </p>
              )}
            </div>
            <div className='grid gap-1 py-1'>
              <Label htmlFor='personas'>Cantidad Personas</Label>
              <Input
                {...register('personas', { valueAsNumber: true })}
                className={cn('border-yellowFPC-400', {
                  'focus-visible:ring-red-500': errors.personas,
                })}
              />
              {errors?.personas && (
                <p className='text-sm text-red-500'>
                  {errors.personas.message}
                </p>
              )}
            </div>

            <div className='grid gap-1 py-1'>
              <Toggle
                aria-label='Toggle-role'
                onPressedChange={() => {
                  setValue('prestado', !estaPrestado)
                  setEstaPrestado(!estaPrestado)
                }}
                defaultPressed={estaPrestado}
                className='border space-x-2'
              >
                {estaPrestado ? <Check size={19} /> : <X size={19} />}
                <p className='tracking-widest'>ESTÁ PRESTADO</p>
              </Toggle>
            </div>

            <PrimaryButton
              text={resource ? 'CONFIRMAR CAMBIOS RECURSO' : 'CREAR RECURSO'}
              isLoading={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
