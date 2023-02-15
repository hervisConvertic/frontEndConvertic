import { TipoDocumento } from './tipo-documento';
export interface Usuario {
    id: number;
    documento: string;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    tipoDocumento: TipoDocumento;
} 