import { ChamadoService } from './../../../../services/chamado.service';
import { ClienteService } from './../../../../services/cliente.service';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Cliente } from './../../../../models/cliente';
import { Tecnico } from './../../../../models/tecnico';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor( 
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: ChamadoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listarTecnico();
    this.listarCliente();
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void {
    this.service.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      this.converteDados();
    })
  }

  update(): void {
    this.service.update(this.chamado).subscribe(resposta => {
      this.service.message("Ordem de serviço atualizada com sucesso!");
      this.router.navigate(['chamados']);
    })
  }

  listarTecnico(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarCliente(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  cancel(): void {
    this.router.navigate(['chamados']);
  }

  converteDados() {
    if (this.chamado.status == "ABERTO") {
      this.chamado.status = 0;
    }
    else if (this.chamado.status == "ANDAMENTO") {
      this.chamado.status = 1;
    }
    else {
      this.chamado.status = 2;
    }

    if (this.chamado.prioridade == "BAIXA") {
      this.chamado.prioridade = 0;
    }
    else if (this.chamado.prioridade == "MEDIA") {
      this.chamado.prioridade = 1;
    }
    else {
      this.chamado.prioridade = 2;
    }
  }
}
