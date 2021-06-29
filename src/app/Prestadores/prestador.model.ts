import { especialidade } from "./especialidade.enum";

export class Prestador {
    id?: number;
    nome: string;
    dataNascimento: Date | string;
    telefone: string;
    endereco: string;
    especialidade: especialidade;
}