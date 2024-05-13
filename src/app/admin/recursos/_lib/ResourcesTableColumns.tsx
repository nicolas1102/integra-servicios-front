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
import { ResourceDialog } from '../_components/ResourceDialog'
import { RecursoInterface } from '@/lib/interfaces/recurso.interface'
import { useResource } from '@/services/useResource'

const ResourcesTableColumns = ({ data }: { data: RecursoInterface[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { deleteResource } = useResource()
  const columns: ColumnDef<RecursoInterface>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre',
      cell: ({ row }) => <div>{row.getValue('nombre')}</div>,
    },
    {
      accessorKey: 'personas',
      header: 'Numero Personas',
      cell: ({ row }) => {
        const resource = row.original
        return <div>{resource.caracteristicas.personas}</div>
      },
    },
    {
      accessorKey: 'tRecurso',
      header: 'Tipo Recurso',
      cell: ({ row }) => {
        const resource = row.original
        return <div>{resource.tRecurso?.nombre}</div>
      },
    },
    {
      accessorKey: 'unit',
      header: 'Unidad',
      cell: ({ row }) => {
        const resource = row.original
        return <div>{resource.tRecurso?.unidad?.nombre}</div>
      },
    },
    {
      accessorKey: 'ubicacion',
      header: 'Ubicación',
      cell: ({ row }) => {
        const resource = row.original
        return <div>{resource.caracteristicas.ubicacion}</div>
      },
    },
    {
      accessorKey: 'prestado',
      header: 'Estado',
      cell: ({ row }) => {
        const resource = row.original
        return (
          <div>
            {resource.prestado ? (
              <p className='text-redFPC-400'>Prestado</p>
            ) : (
              'Disponible'
            )}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const resource = row.original
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
                    if (resource?.id)
                      navigator.clipboard.writeText(resource.id + '')
                  }}
                >
                  Copiar ID de recurso
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
                  <ResourceDialog resource={resource} />
                </div>

                <DropdownMenuItem
                  onClick={() => {
                    if (resource?.id) deleteResource(resource)
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-red-600 font-medium'>
                    Eliminar recurso
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

export default ResourcesTableColumns
