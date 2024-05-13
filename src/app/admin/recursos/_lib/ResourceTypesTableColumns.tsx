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
import { ResourceTypeDialog } from '../_components/ResourceTypeDialog'
import { TipoRecursoInterface } from '@/lib/interfaces/tipoRecurso.interface'
import { useResourceType } from '@/services/useResourceType'

const ResourceTypesTableColumns = ({
  data,
}: {
  data: TipoRecursoInterface[]
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { deleteResourceType } = useResourceType()
  const columns: ColumnDef<TipoRecursoInterface>[] = [
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
      accessorKey: 'unidad',
      header: 'Unidad',
      cell: ({ row }) => {
        const resourceType = row.original
        return <div>{resourceType.unidad?.nombre}</div>
      },
    },
    {
      accessorKey: 'diasAtencion',
      header: 'Días de Atención',
      cell: ({ row }) => {
        const tipoRecurso = row.original
        return (
          <div>
            {tipoRecurso.horEntSem
              ? tipoRecurso.horEntSem.map(
                  (horario) => horario.dia.slice(0, 3) + '-'
                )
              : ''}
            {tipoRecurso.horFinSem
              ? tipoRecurso.horFinSem.map(
                  (horario) => horario.dia.slice(0, 3) + '-'
                )
              : ''}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const resourceType = row.original
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
                    if (resourceType?.id)
                      navigator.clipboard.writeText(resourceType.id + '')
                  }}
                >
                  Copiar ID de tipoRecurso
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <div className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted'>
                  <ResourceTypeDialog resourceType={resourceType} />
                </div>

                <DropdownMenuItem
                  onClick={() => {
                    if (resourceType?.id) deleteResourceType(resourceType)
                  }}
                  className='cursor-pointer'
                >
                  <span className='text-red-600 font-medium'>
                    Eliminar tipoRecurso
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

export default ResourceTypesTableColumns
