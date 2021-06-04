import { especialidade } from "./especialidade.enum";

export class Prestador {
    id?: number;
    nome: string;
    dataNascimento: Date;
    telefone: number;
    endereco: string;
    especialidade: especialidade;
}