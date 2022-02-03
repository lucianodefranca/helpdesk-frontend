import { ChamadoService } from './../../../../services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-view',
  templateUrl: './chamado-view.component.html',
  styleUrls: ['./chamado-view.component.css']
})
export class ChamadoViewComponent implements OnInit {

  chamado: Chamado = {
    cliente: '',
    tecnico: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: ChamadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findByid();
  }

  findByid():void {
    this.service.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    })
  }

  return() {
    this.router.navigate(['chamados']);
  }

}
