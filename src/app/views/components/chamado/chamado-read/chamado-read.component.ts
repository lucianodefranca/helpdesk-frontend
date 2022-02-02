import { ClienteService } from './../../../../services/cliente.service';
import { ChamadoService } from './../../../../services/chamado.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})

export class ChamadoReadComponent implements AfterViewInit {

  chamados: Chamado[] = [];

  displayedColumns: string[] = ['cliente', 'tecnico', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<Chamado>(this.chamados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ChamadoService, 
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.chamados = resposta;
      this.listTecnico();
      this.listCliente();
      this.dataSource = new MatTableDataSource<Chamado>(this.chamados);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['chamados/create']);
  }

  listTecnico(): void {
    this.chamados.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome;
      })
    })
  }

  listCliente(): void {
    this.chamados.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome;
      })
    })
  }
}