import { Badge } from '@/components/ui/badge'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction } from 'react'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { User } from 'lucide-react'

const ResourceItem = ({
  resourceData,
  isSelected,
  setSelectedResource,
}: {
  resourceData: RecursoInterface
  isSelected?: boolean
  setSelectedResource: Dispatch<SetStateAction<RecursoInterface | null>>
}) => {
  return (
    <div
      className={`duration-500 border border-primary p-4 ${
        isSelected ? 'bg-yellowFPC-200 text-black' : 'hover:bg-muted'
      }`}
      key={resourceData.id}
      onClick={() => {
        setSelectedResource(resourceData)
      }}
    >
      <div className='col-span-8'>
        <h2 className='uppercase tracking-widest text-xl overflow-hidden text-ellipsis truncate '>
          {resourceData.nombre}
        </h2>{' '}
        <div className='flex flex-row gap-1 py-1 flex-wrap'>
          <Badge className='bg-yellowFPC-400 text-black  border border-primary'>
            {'Unidad de ' + resourceData.tRecurso?.unidad?.nombre}
          </Badge>
          <Badge className='bg-blueFPC-400 text-black border border-primary'>
            {resourceData.tRecurso?.nombre}
          </Badge>
        </div>
        <div className=' text-sm'>
          <div className='leading-tight'>
            <p className=' overflow-hidden text-ellipsis truncate '>
              Descripción: {resourceData.caracteristicas.descripcion}
            </p>
            <p className=' overflow-hidden text-ellipsis truncate '>
              Ubicación: {resourceData.caracteristicas.ubicacion}
            </p>

            <p className='flex flex-row gap-0.5'>
              <User size={20} strokeWidth={1.3} />
              {resourceData.caracteristicas.personas}
            </p>
            <div className='font-medium flex flex-row gap-2'>
              Días disponibles:{' '}
              <span className='flex flex-row gap-1'>
                {resourceData.tRecurso?.horEntSem.map((dia) => (
                  <p key={dia.dia}>{dia.dia.charAt(0).toUpperCase()}</p>
                ))}
                {resourceData.tRecurso?.horFinSem.map((dia) => (
                  <p key={dia.dia}>{dia.dia.charAt(0).toUpperCase()}</p>
                ))}
              </span>
            </div>
          </div>

          <div className='pt-3'>
            <BookingSheet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceItem
