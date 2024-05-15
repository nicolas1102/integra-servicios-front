export interface Horario {
  dia: string
  hora_inicio: string
  hora_fin: string
}

export interface RecursoBazuquerosInterface {
  id: number
  nombre: string
  descripcion: string
  tipo: string
  ubicacion: string
  horario_disponibilidad: Horario[]
}

export interface InterfaceBazuqueros {
  plataforma: string
  tipo: string
  datos: {
    operacion: string
    entidad: string
    data: RecursoBazuquerosInterface[]
  }
}