import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  public servicos: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.servicos = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
