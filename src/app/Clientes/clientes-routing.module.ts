import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesPage } from './clientes.page';
import { ClientesCadastroComponent } from './clientes-cadastro/clientes-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    path: 'cadastro',
    component: ClientesCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: ClientesCadastroComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
