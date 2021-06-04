import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController,  } from '@ionic/angular';
import { Prestador } from './prestador.model';
import { PrestadorService} from './prestador.service';


@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.page.html',
  styleUrls: ['./prestadores.page.scss'],
})
export class PrestadoresPage implements OnInit {
  prestadores: Prestador[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private prestadorService: PrestadorService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.prestadorService
      .getPrestadores()
      .subscribe(
        (dados) => {
          this.prestadores = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(prestador: Prestador) {
    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o prestador de serviço ${prestador.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(prestador)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(prestador: Prestador) {
    this.prestadorService
      .excluir(prestador.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o prestador ${prestador.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}

