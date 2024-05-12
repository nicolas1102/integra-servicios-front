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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserInterface } from '@/lib/interfaces/usuario.interface'
import { useRef, useState } from 'react'
import { useUser } from '@/services/useUser'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { EditUserDialog } from '../_components/EditUserDialog'
import { Dialog } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { AdminDialog } from '../_components/UnitDialog'
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { useUnit } from '@/services/useUnit'

const UsersTableColumns = ({ data }: { data: UnidadInterface[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  // const { deleteUnit } = useUnit()
  const { data: session } = useSession()
  const router = useRouter()
  const columns: ColumnDef<UnidadInterface>[] = [
    {
      accessorKey: 'idUnidad',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('idUnidad')}</div>,
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre',
      cell: ({ row }) => <div>{row.getValue('nombre')}</div>,
    },
    {
      accessorKey: 'tMinPrestamo',
      header: 'Tiempo Min. Prestamo',
      cell: ({ row }) => <div>{row.getValue('tMinPrestamo') + ' min.'}</div>,
    },
    {
      accessorKey: 'horEntSem',
      header: 'Hora Entre Semana',
      cell: ({ row }) => {
        const unidad = row.original
        return (
          <div>
            {unidad.horEntSem.inicio + ' - ' + unidad.horEntSem.fin}
          </div>
        )
      },
    },
    {
      accessorKey: 'horFinSem',
      header: 'Hora Fin de Semana',
      cell: ({ row }) => {
        const unidad = row.original
        return (
          <div>
            {unidad.horFinSem.inicio + ' - ' + unidad.horFinSem.fin}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const unit = row.original
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
                    if (unit?.idUnidad) navigator.clipboard.writeText(unit.idUnidad + '')
                  }}
                >
                  Copiar ID de unidad
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
                  <AdminDialog unit={unit} />
                </div>

                <DropdownMenuItem
                  onClick={() => {
                    if (unit?.idUnidad) deleteUnit(unit.idUnidad)
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-red-600 font-medium'>
                    Eliminar unidad
                  </span>
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

export default UsersTableColumns
