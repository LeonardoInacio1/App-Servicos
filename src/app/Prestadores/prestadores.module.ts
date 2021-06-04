import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { PrestadoresPageRoutingModule } from './prestadores-routing.module';

import { PrestadoresPage } from './prestadores.page';
import { PrestadoresCadastroComponent } from './prestadores-cadastro/prestadores-cadastro.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PrestadoresPageRoutingModule,
    HttpClientModule
  ],
  declarations: [PrestadoresPage, PrestadoresCadastroComponent]
})
export class PrestadoresPageModule {}
