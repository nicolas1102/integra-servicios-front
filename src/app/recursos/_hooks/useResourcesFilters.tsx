'use client'

import { useState, useMemo } from 'react'
import { useResource } from '@/services/useResource'

export function useResourcesFilters() {
  // const [parkingLots, setParkingLots] = useState<ParkingInterface[]>([])
  const { resources, isLoading, getResources } = useResource()

  const [filterBorrowed, setFilterBorrowed] = useState<boolean>(true)
  const [filterName, setFilterName] = useState<string>('')
  const [filterUnit, setFilterUnit] = useState<string>('')
  const [filterLocation, setFilterLocation] = useState<string>('')
  const [filterResourceType, setFilterResourceType] = useState<string>('')
  const [filterMonday, setFilterMonday] = useState<boolean>(false)
  const [filterTuesday, setFilterTuesday] = useState<boolean>(false)
  const [filterWednesday, setFilterWednesday] = useState<boolean>(false)
  const [filterThursday, setFilterThursday] = useState<boolean>(false)
  const [filterFriday, setFilterFriday] = useState<boolean>(false)
  const [filterSaturday, setFilterSaturday] = useState<boolean>(false)
  const [filterSunday, setFilterSunday] = useState<boolean>(false)

  // uso de useMemo para que si la busqueda da el mismo resultado, no realice la operación
  const filteredResources = useMemo(() => {
    // filtro de estado
    let filteredObjs = resources.filter(
      (resource) => resource.prestado === filterBorrowed
    )

    // filtro de nombre
    filteredObjs =
      filterName.length > 0
        ? resources.filter((resource) => {
            return resource.nombre
              .toLowerCase()
              .includes(filterName.toLowerCase())
          })
        : resources

    // filtro de unidad
    filteredObjs =
      filterUnit.length > 0
        ? filteredObjs.filter((resource) => {
            return resource.tRecurso?.unidad?.nombre
              .toLowerCase()
              .includes(filterUnit.toLowerCase())
          })
        : filteredObjs

    // filtro de ubicacion
    filteredObjs =
      filterLocation.length > 0
        ? filteredObjs.filter((resource) => {
            return resource.caracteristicas.ubicacion
              .toLowerCase()
              .includes(filterLocation.toLowerCase())
          })
        : filteredObjs

    // filtro de tipo recurso
    filteredObjs =
      filterResourceType.length > 0
        ? filteredObjs.filter((resource) => {
            return resource.tRecurso?.nombre
              .toLowerCase()
              .includes(filterResourceType.toLowerCase())
          })
        : filteredObjs

    filteredObjs = filterMonday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horEntSem.some(
            (horEntSem) => horEntSem.dia.toLowerCase() === 'lunes'
          )
        )
      : filteredObjs

    filteredObjs = filterTuesday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horEntSem.some(
            (horEntSem) => horEntSem.dia.toLowerCase() === 'martes'
          )
        )
      : filteredObjs

    filteredObjs = filterWednesday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horEntSem.some(
            (horEntSem) => horEntSem.dia.toLowerCase() === 'miercoles'
          )
        )
      : filteredObjs

    filteredObjs = filterThursday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horEntSem.some(
            (horEntSem) => horEntSem.dia.toLowerCase() === 'jueves'
          )
        )
      : filteredObjs

    filteredObjs = filterFriday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horEntSem.some(
            (horEntSem) => horEntSem.dia.toLowerCase() === 'viernes'
          )
        )
      : filteredObjs

    filteredObjs = filterSaturday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horFinSem.some(
            (horFinSem) => horFinSem.dia.toLowerCase() === 'sabado'
          )
        )
      : filteredObjs

    filteredObjs = filterSunday
      ? filteredObjs.filter((resource) =>
          resource.tRecurso?.horFinSem.some(
            (horFinSem) => horFinSem.dia.toLowerCase() === 'domingo'
          )
        )
      : filteredObjs

    return filteredObjs
  }, [
    resources,
    filterName,
    filterUnit,
    filterLocation,
    filterResourceType,
    filterMonday,
    filterTuesday,
    filterWednesday,
    filterThursday,
    filterFriday,
    filterSaturday,
    filterSunday,
    filterBorrowed,
  ])

  return {
    filterUnit,
    setFilterUnit,
    filterName,
    setFilterName,
    filterResourceType,
    setFilterResourceType,
    filterLocation,
    setFilterLocation,
    filterBorrowed,
    setFilterBorrowed,
    filterMonday,
    setFilterMonday,
    filterTuesday,
    setFilterTuesday,
    filterWednesday,
    setFilterWednesday,
    filterThursday,
    setFilterThursday,
    filterFriday,
    setFilterFriday,
    filterSaturday,
    setFilterSaturday,
    filterSunday,
    setFilterSunday,
    filteredResources,
  }
}
