export interface ReservaUnidadInterface {
  dia: Date;
  horario: {
    fin: string,
    inicio: string
  };
  idReserva: string;
  idUsuario: string;
}
