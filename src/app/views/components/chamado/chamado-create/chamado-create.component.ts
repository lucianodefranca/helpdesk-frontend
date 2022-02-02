import { ClienteService } from './../../../../services/cliente.service';
import { Cliente } from './../../../../models/cliente';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Tecnico } from './../../../../models/tecnico';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  selected = '';

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor( 
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarTecnico();
    this.listarCliente();
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
}
