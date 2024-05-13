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
import { UnidadInterface } from '@/lib/interfaces/unidad.interface'
import { cn } from '@/lib/utils'
import { useUnit } from '@/services/useUnit'
import { useUser } from '@/services/useUser'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

export function UnitSelect({
  unit,
  setUnit,
  errors,
}: {
  unit: UnidadInterface | null
  setUnit: Dispatch<SetStateAction<UnidadInterface | null>>
  errors: FieldError | undefined
}) {
  const { units, getUnits, isLoading } = useUnit()
  useEffect(() => {
    const fetchUnits = () => {
      getUnits()
    }
    fetchUnits()    
  }, [])
  return (
    <Select
    onValueChange={(value) => {
      const selectedUnit = units.filter((unit) => {
        return unit.id === value
      })      
      setUnit(selectedUnit[0])
    }}
    value={unit ? unit.id : ''}
    disabled={isLoading || units?.length === 0 ? true : false}
    >
      <SelectTrigger
        className={cn('w-full border border-yellowFPC-400', {
          'focus-visible:ring-red-500': errors,
        })}
      >
        <SelectValue placeholder='Unidades' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Unidades</SelectLabel>
          {units &&
            units.map((unitItem) => (
              <SelectItem key={unitItem.id} value={unitItem.id!}>
                {unitItem.nombre}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
