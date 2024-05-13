'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { ReservaInterface } from '@/lib/interfaces/reserva.interface'
import { useBooking } from '@/services/useBooking'
import { Timestamp } from 'firebase/firestore'

const BookingsTableColumns = ({ data }: { data: ReservaInterface[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const columns: ColumnDef<ReservaInterface>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'recurso',
      header: 'Recurso',
      cell: ({ row }) => {
        const booking = row.original
        return <div>{booking.recurso?.nombre}</div>
      },
    },
    {
      accessorKey: 'tipoRecurso',
      header: 'Tipo Recuso',
      cell: ({ row }) => {
        const booking = row.original
        return <div>{booking.recurso?.tRecurso?.nombre}</div>
      },
    },
    {
      accessorKey: 'unidad',
      header: 'Unidad',
      cell: ({ row }) => {
        const booking = row.original
        return <div>{booking.recurso?.tRecurso?.unidad?.nombre}</div>
      },
    },
    {
      accessorKey: 'usuario',
      header: 'Usuario',
      cell: ({ row }) => {
        const booking = row.original
        return (
          <div>
            {booking.usuario?.nombres + ' ' + booking.usuario?.apellidos}
          </div>
        )
      },
    },
    {
      accessorKey: 'horario',
      header: 'Horario',
      cell: ({ row }) => {
        const booking = row.original
        const date = booking.dia.toDate()
        const formattedDate = date.toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        return (
          <div>
            {booking.horario.inicio +
              ' - ' +
              booking.horario.fin +
              ' | ' +
              formattedDate}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const bookings = row.original
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='h-8 w-8 p-0'>
                  <p className='sr-only'>Abrir Menu</p>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={5}>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (bookings?.id)
                      navigator.clipboard.writeText(bookings.id + '')
                  }}
                >
                  Copiar ID de reserva
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (bookings?.id)
                      navigator.clipboard.writeText(bookings.idRecurso + '')
                  }}
                >
                  Copiar ID de recurso
                </DropdownMenuItem>{' '}
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (bookings?.id)
                      navigator.clipboard.writeText(
                        bookings.recurso?.tRecurso?.id + ''
                      )
                  }}
                >
                  Copiar ID de tipo recurso
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (bookings?.id)
                      navigator.clipboard.writeText(
                        bookings.recurso?.tRecurso?.unidad?.id + ''
                      )
                  }}
                >
                  Copiar ID de unidad
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    if (bookings?.id)
                      navigator.clipboard.writeText(bookings.idUsuario + '')
                  }}
                >
                  Copiar ID de usuario
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return { table, columns }
}

export default BookingsTableColumns
