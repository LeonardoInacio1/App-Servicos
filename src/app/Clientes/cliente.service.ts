
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8080/TrabalhoServicos/api/clientes';

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.url);
  }

  excluir(id: number): Observable <Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.url}/${id}`);
  }

  private adicionar(cliente: Cliente)  {
    console.log(cliente);
    return this.httpClient.post(this.url, cliente);
  }
  private atualizar(cliente: Cliente) {
    return this.httpClient.put(`${this.url}/${cliente.id}`, cliente);
  }

  salvar(cliente: Cliente) {
    console.log(cliente);
    if(cliente.id) {
      return this.atualizar(cliente);
    } else {
      return this.adicionar(cliente);
    }
  }



}
