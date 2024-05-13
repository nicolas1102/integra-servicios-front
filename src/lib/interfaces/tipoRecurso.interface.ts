import { UnidadInterface } from './unidad.interface';

export interface TipoRecursoInterface {
  id?: string;
  nombre: string,
  descripcion: string;
  unidad?: UnidadInterface
  horEntSem: horario[];
  horFinSem: horario[];
  idUnidad: string
}

interface horario {
  dia: string,
  hora_fin: string,
  hora_inicio: string
}