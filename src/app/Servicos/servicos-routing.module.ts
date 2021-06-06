import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicosCadastroComponent } from './servicos-cadastro/servicos-cadastro.component';

import { ServicosPage } from './servicos.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPage
  },
  {
    path: 'cadastro',
    component: ServicosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: ServicosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosPageRoutingModule {}
