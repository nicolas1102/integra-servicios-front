export interface TipoRecursoUnidadInterface {
  caracteristicas: {
    personas: string,
  };
  descripcion: string;
  horEntSem: [{
    dia: string,
    hora_fin: string,
    hora_inicio: string
  }];
  horFinSem: [{
    dia: string,
    hora_fin: string,
    hora_inicio: string
  }];
  idTRecurso: string;
  idUnidad: string;
  nombre: string,
}
