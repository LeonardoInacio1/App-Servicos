import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from './servico.model';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private url = 'http://localhost:8080/TrabalhoServicos/api/servicos';

  constructor(
    private httpClient: HttpClient
  ) { }

  getServicos(): Observable<Servico[]> {
    return this.httpClient.get<Servico[]>(this.url);
  }

  getServico(id: number): Observable<Servico> {
    return this.httpClient.get<Servico>(`${this.url}/${id}`);
  }

  salvar(servico: Servico) {
    if(servico.id) {
      return this.atualizar(servico);
    } else {
      return this.adicionar(servico);
    }
  }

  excluir(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  private adicionar(servico: Servico)  {
    console.log(servico) ;
    return this.httpClient.post(this.url, servico);
  }

  private atualizar(servico: Servico) {
    return this.httpClient.put(`${this.url}/${servico.id}`, servico);
  }

}
