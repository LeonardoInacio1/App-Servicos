import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ServicosPageRoutingModule } from './servicos-routing.module';

import { ServicosPage } from './servicos.page';
import { ServicosCadastroComponent } from './servicos-cadastro/servicos-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ServicosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ServicosPage, ServicosCadastroComponent]
})
export class ServicosPageModule {}
