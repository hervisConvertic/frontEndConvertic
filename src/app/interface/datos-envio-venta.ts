import { Ciudad } from './ciudad';
import { Usuario } from './usuario';
export interface DatosEnvioVenta {
    id: number;
    direccion: string;
    correo: string;
    fecha: Date;
    ciudad: Ciudad;
    usuario: Usuario;
}
