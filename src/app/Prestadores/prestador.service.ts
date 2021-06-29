import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestador } from './prestador.model';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  private url = 'http://localhost:8080/TrabalhoServicos/api/prestadores';

  constructor(
    private httpClient: HttpClient
  ) {}

  getPrestadores(): Observable<Prestador[]>{
    return this.httpClient.get<Prestador[]>(this.url);
  }

  excluir(id: number): Observable <Object> {
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  getPrestador(id: number): Observable<Prestador> {
    return this.httpClient.get<Prestador>(`${this.url}/${id}`);
  }

  private adicionar(prestador: Prestador)  {
    return this.httpClient.post(this.url, prestador);
  }

  private atualizar(prestador: Prestador) {
    return this.httpClient.put(`${this.url}/${prestador.id}`, prestador);
  }

  salvar(prestador: Prestador) {
    if(prestador.id) {
      return this.atualizar(prestador);
    } else {
      return this.adicionar(prestador);
    }
  }

  




}
