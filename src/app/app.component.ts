import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicial', url: '/inicial', icon: 'home' },
    { title: 'Cliente', url: '/cliente', icon: 'people' },
    { title: 'Prestador', url: '/prestador', icon: 'people' },
    { title: 'Servico', url: '/servico', icon: 'hammer' }
  ];
  constructor() {}
}
