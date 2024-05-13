import { Timestamp } from 'firebase/firestore';
import { RecursoInterface } from './recurso.interface';
import { UsuarioInterface } from './usuario.interface';

export interface ReservaInterface {
  id?: string;
  dia: Timestamp;
  horario: {
    fin: string,
    inicio: string
  };
  idUsuario: string;
  usuario?: UsuarioInterface
  idRecurso: string;
  recurso?: RecursoInterface
}
