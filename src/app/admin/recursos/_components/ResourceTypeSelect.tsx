'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TipoRecursoInterface } from '@/lib/interfaces/tipoRecurso.interface'
import { cn } from '@/lib/utils'
import { useResourceType } from '@/services/useResourceType'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldError } from 'react-hook-form'

export function ResourceTypeSelect({
  tResourse,
  setTResourse,
  errors,
}: {
  tResourse: TipoRecursoInterface | null
  setTResourse: Dispatch<SetStateAction<TipoRecursoInterface | null>>
  errors: FieldError | undefined
}) {
  const { resourceTypes, getResourceTypes, isLoading } = useResourceType()
  useEffect(() => {
    const fetchResourceTypes = () => {
      getResourceTypes()
    }
    fetchResourceTypes()
  }, [])
  return (
    <Select
      onValueChange={(value) => {
        const selectedResourceType = resourceTypes.filter((resourceType) => {
          return resourceType.id === value
        })
        setTResourse(selectedResourceType[0])
      }}
      value={tResourse ? tResourse.id : ''}
      disabled={isLoading || resourceTypes?.length === 0 ? true : false}
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder='Tipo Recurso' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo Recurso</SelectLabel>
          {resourceTypes &&
            resourceTypes.map((resourceTypeItem) => (
              <SelectItem
                key={resourceTypeItem.id}
                value={resourceTypeItem.id!}
              >
                {resourceTypeItem.nombre +
                  ' | Unidad:' +
                  resourceTypeItem.unidad?.nombre}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
