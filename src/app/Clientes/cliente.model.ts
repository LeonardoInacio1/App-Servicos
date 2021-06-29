import { Genero } from './genero.enum';

export class Cliente{
    id?: number;
    nome: string;
    dataNascimento: Date | string;
    genero: Genero;
    cpf: string;
    endereco: string;
}
