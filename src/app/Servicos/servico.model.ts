import { Cliente } from "../Clientes/cliente.model";
import { Prestador } from "../Prestadores/prestador.model";

export class Servico {
    id?: number;
    cliente: Cliente;
    prestador: Prestador;
    dataServico: Date | string; 
    descricao: string;
    tempoEstimado: string;
}
