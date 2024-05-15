import { Badge } from '@/components/ui/badge'
import BookingSheet from './BookingSheet'
import { Dispatch, SetStateAction } from 'react'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { User } from 'lucide-react'
import { RecursoBazuquerosInterface } from '@/lib/interfaces/recursoBazuqueros.interface'

const BazuquerosResourceItem = ({
  bazuquerosResourceItemData,
  isSelected,
  setSelectedBazuquerosResourceItem,
}: {
  bazuquerosResourceItemData: RecursoBazuquerosInterface
  isSelected?: boolean
  setSelectedBazuquerosResourceItem: Dispatch<
    SetStateAction<RecursoBazuquerosInterface | null>
  >
}) => {
  return (
    <div
      className={`duration-500 border border-primary p-4 ${
        isSelected ? 'bg-yellowFPC-200 text-black' : 'hover:bg-muted'
      }`}
      key={bazuquerosResourceItemData.id}
      onClick={() => {
        setSelectedBazuquerosResourceItem(bazuquerosResourceItemData)
      }}
    >
      <div className='col-span-8'>
        <h2 className='uppercase tracking-widest text-xl overflow-hidden text-ellipsis truncate '>
          {bazuquerosResourceItemData.nombre}
        </h2>{' '}
        <div className='flex flex-row gap-1 py-1 flex-wrap'>
          <Badge className='bg-yellowFPC-400 text-black  border border-primary'>
            {'Unidad: ' + bazuquerosResourceItemData.ubicacion}
          </Badge>
          <Badge className='bg-blueFPC-400 text-black border border-primary'>
            {'Tipo: ' + bazuquerosResourceItemData.tipo}
          </Badge>
        </div>
        <div className=' text-sm'>
          <div className='leading-tight'>
            <p className=' overflow-hidden text-ellipsis truncate '>
              Descripción: {bazuquerosResourceItemData.descripcion}
            </p>
            <div className='font-medium flex flex-row gap-2'>
              Días disponibles:{' '}
              <span className='flex flex-row gap-1'>
                {bazuquerosResourceItemData.horario_disponibilidad.map(
                  (dia) => {
                    return (
                      <p key={dia.dia}>{dia.dia.charAt(0).toUpperCase()}</p>
                    )
                  }
                )}
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

export default BazuquerosResourceItem
