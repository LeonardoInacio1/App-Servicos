import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Servico } from '../servico.model';
import { ServicosService } from '../servicos.service';

import { Cliente } from 'src/app/Clientes/cliente.model';
import { ClienteService } from '../../Clientes/cliente.service';

import { PrestadorService } from '../../Prestadores/prestador.service';
import { Prestador } from 'src/app/Prestadores/prestador.model';

@Component({
  selector: 'app-servicos-cadastro',
  templateUrl: './servicos-cadastro.component.html',
  styleUrls: ['./servicos-cadastro.component.scss'],
})
export class ServicosCadastroComponent implements OnInit {

  mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  servicoId: number;
  servicoForm: FormGroup;
  clientes: Cliente[];
  prestadores: Prestador[];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private servicoService: ServicosService,
    private clientService: ClienteService,
    private prestadoresService: PrestadorService,
    private router: Router,
  ) {
    const servico = {
      id: null,
      cliente: null,
      prestador: null,
      dataServico: null,
      descricao: '',
      tempoEstimado: '',
    };
    this.initializaFormulario(servico);
  }

  ngOnInit() {
    this.clientService.getClientes().subscribe( cliente => this.clientes = cliente);
    this.prestadoresService.getPrestadores().subscribe( prestador => this.prestadores = prestador);
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(!isNaN(id)){
      this.servicoId = id;
      this.servicoService
      .getServico(id)
      .subscribe((servico) => {
      this.initializaFormulario(servico);
      });
    }
  }

  initializaFormulario(servico: Servico) {
    this.servicoForm = new FormGroup({
      cliente: new FormControl(servico.cliente, [
        Validators.required,
      ]),
      prestador: new FormControl(servico.prestador, [
        Validators.required,
      ]),
      dataServico: new FormControl(servico.dataServico, [
        Validators.required,
      ]),
      descricao: new FormControl(servico.descricao, [
        Validators.minLength(5),
        Validators.maxLength(500),
        Validators.required,
      ]),
      tempoEstimado: new FormControl(servico.tempoEstimado, [
        Validators.required,
      ])
    });
  }

  salvar() {
    const servico: Servico = {...this.servicoForm.value, id: this.servicoId};
    this.servicoService.salvar(servico).subscribe(
      () => this.router.navigate(['servicos']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o servico de serviços!`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );

    this.router.navigate(['servicos']);
  }

  get cliente() {
    return this.servicoForm.get('cliente');
  }
  get prestador() {
    return this.servicoForm.get('prestador');
  }
  get dataServico(){
    return this.servicoForm.get('dataServico');
  }
  get descricao(){
    return this.servicoForm.get('descricao');
  }
  get tempoEstimado(){
    return this.servicoForm.get('tempoEstimado');
  }
}
