import { TarjetaCredito } from './tarjeta-credito';

export class Cliente {
  id: number;
  tipoDocumento: string;
  documento: string;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
  telefono: string;
  direccion: string;
  tarjetas: TarjetaCredito[] = [];
}


export class TipoDocumento {
  tipo: string;
}
