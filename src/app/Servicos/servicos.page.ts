import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Servico } from './servico.model';
import { ServicosService } from './servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  public servicos: Servico[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private servicosService: ServicosService,
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.servicosService
      .getServicos()
      .subscribe(
        (dados) => {
          this.servicos = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(servico: Servico) {
    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o servico ?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(servico)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  formatDate(date: string) {
    const data = new Date(date);
        const dia  = data.getDate().toString();
        const diaF = (dia.length === 1) ? '0'+dia : dia;
        const mes  = (data.getMonth()+1).toString();
        const mesF = (mes.length === 1) ? '0'+mes : mes;
        const anoF = data.getFullYear();
    return diaF+'/'+mesF+'/'+anoF;
  }

  private excluir(servico: Servico) {
    this.servicosService
      .excluir(servico.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o servico!`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }

}
