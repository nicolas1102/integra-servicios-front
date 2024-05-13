export interface ReservaInterface {
  dia: Date;
  horario: {
    fin: string,
    inicio: string
  };
  idReserva: string;
  idUsuario: string;
}
