import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Genero } from '../genero.enum';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.scss'],
})
export class ClientesCadastroComponent implements OnInit {

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

  clienteId: number;
  clientesForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router,
  ) { 
    let cliente = {
      id: null,
      nome: '',
      dataNascimento: null,
      genero: Genero.FEMININO,
      cpf: '',
      endereco: '',
    };
    this.initializaFormulario(cliente);
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(!isNaN(id)){
      this.clienteId = id;
      this.clienteService.
      getCliente(id)
      .subscribe((cliente) => {
      this.initializaFormulario(cliente);
      });
    }
  }
    initializaFormulario(cliente: Cliente) {
      this.clientesForm = new FormGroup({
        nome: new FormControl(cliente.nome, [
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(150),  
        ]),      
        dataNascimento: new FormControl(cliente.dataNascimento),
        genero: new FormControl(cliente.genero, Validators.required),
        cpf: new FormControl(cliente.cpf, Validators.required),
        endereco: new FormControl(cliente.endereco, [
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(50),  
        ])
      })
    }   

    salvar() {
      const cliente: Cliente = {...this.clientesForm.value, id: this.clienteId}
      this.clienteService.salvar(cliente).subscribe(
        () => this.router.navigate(['clientes']),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível salvar o cliente ${cliente.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
      this.router.navigate(['clientes']);
  }
  
get nome() {
  return this.clientesForm.get('nome');
}

get dataNascimento() {
  return this.clientesForm.get('dataNascimento');
}

get genero(){
  return this.clientesForm.get('genero');
}
get cpf(){
  return this.clientesForm.get('cpf');
}
get endereco(){
  return this.clientesForm.get('endereco');
}
}
