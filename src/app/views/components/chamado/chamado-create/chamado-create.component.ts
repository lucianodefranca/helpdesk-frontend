import { ChamadoService } from './../../../../services/chamado.service';
import { ClienteService } from './../../../../services/cliente.service';
import { Cliente } from './../../../../models/cliente';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Tecnico } from './../../../../models/tecnico';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnico();
    this.listarCliente();
  }

  create(): void {
    this.service.create(this.chamado).subscribe(resposta => {
      this.service.message("Ordem de serviço criada com sucesso!");
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
}
