import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicial', url: '/inicial', icon: 'home' },
    { title: 'Cliente', url: '/clientes', icon: 'people' },
    { title: 'Prestador', url: '/prestadores', icon: 'people' },
    { title: 'Servico', url: '/servicos', icon: 'hammer' }
  ];
  constructor() {}
}
