import { TipoRecursoInterface } from './tipoRecurso.interface';

export interface RecursoInterface {
  id: string;
  nombre: string;
  idTRecurso: string;
  tRecurso?: TipoRecursoInterface
  caracteristicas: {
    personas: number;
    descripcion: string;
    ubicacion: string;
  };
  prestado: boolean;
}
