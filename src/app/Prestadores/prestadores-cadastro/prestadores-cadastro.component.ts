import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { especialidade } from '../especialidade.enum';
import { Prestador } from '../prestador.model';
import { PrestadorService } from '../prestador.service';

@Component({
  selector: 'app-prestadores-cadastro',
  templateUrl: './prestadores-cadastro.component.html',
  styleUrls: ['./prestadores-cadastro.component.scss'],
})
export class PrestadoresCadastroComponent implements OnInit {

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

  prestadorId: number;
  prestadoresForm: FormGroup;


  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private prestadorService: PrestadorService,
    private router: Router,
  ) {
    let prestador = {
      id: null,
      nome: '',
      dataNascimento: null,
      telefone: 0,
      endereco: '',
      especialidade: especialidade.ADVOGADO,
    };
    this.initializaFormulario(prestador);
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(!isNaN(id)){
      this.prestadorId = id;
      this.prestadorService
      .getPrestador(id)
      .subscribe((prestador) => {
      this.initializaFormulario(prestador);
      });
    }
  }

  initializaFormulario(prestador: Prestador) {
    this.prestadoresForm = new FormGroup({
      nome: new FormControl(prestador.nome, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      dataNascimento: new FormControl(prestador.dataNascimento),
      telefone: new FormControl(prestador.telefone),
      endereco: new FormControl(prestador.endereco, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(75),  
      ]),   
      especialidade: new FormControl(prestador.especialidade, Validators.required)
    })
  }

  salvar() {
    const prestador: Prestador = {...this.prestadoresForm.value, id: this.prestadorId}
    this.prestadorService.salvar(prestador).subscribe(
      () => this.router.navigate(['prestadores']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o prestador de serviços ${prestador.nome}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );

    this.router.navigate(['prestadores']);
  }

  get nome() {
    return this.prestadoresForm.get('nome');
  }
  
  get dataNascimento() {
    return this.prestadoresForm.get('dataNascimento');
  }
  
  get telefone(){
    return this.prestadoresForm.get('telefone');
  }
  get endereco(){
    return this.prestadoresForm.get('endereco');
  }
  get especialidade(){
    return this.prestadoresForm.get('especialidade')
  }
}
