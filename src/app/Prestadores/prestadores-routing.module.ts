import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestadoresCadastroComponent } from './prestadores-cadastro/prestadores-cadastro.component';

import { PrestadoresPage } from './prestadores.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadoresPage
  },{
    path: 'cadastro',
    component: PrestadoresCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: PrestadoresCadastroComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestadoresPageRoutingModule {}
