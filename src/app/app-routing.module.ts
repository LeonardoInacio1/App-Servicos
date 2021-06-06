import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicial',
    pathMatch: 'full'
  },
  {
    path: 'inicial',
    loadChildren: () => import('./Inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./Clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'prestadores',
    loadChildren: () => import('./Prestadores/prestadores.module').then( m => m.PrestadoresPageModule)
  },
  {
    path: 'servicos',
    loadChildren: () => import('./Servicos/servicos.module').then( m => m.ServicosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
