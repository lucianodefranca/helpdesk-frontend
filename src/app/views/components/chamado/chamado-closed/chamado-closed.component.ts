import { ClienteService } from './../../../../services/cliente.service';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Router } from '@angular/router';
import { ChamadoService } from './../../../../services/chamado.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-closed',
  templateUrl: './chamado-closed.component.html',
  styleUrls: ['./chamado-closed.component.css']
})
export class ChamadoClosedComponent implements AfterViewInit {

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
      
      resposta.forEach(obj => {
        if (obj.status == "ENCERRADO") {
          this.chamados.push(obj);
        }
      })

      this.listTecnico();
      this.listCliente();
      this.dataSource = new MatTableDataSource<Chamado>(this.chamados);
      this.dataSource.paginator = this.paginator;
    })
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

  prioridade(x: any) {
    if (x == "BAIXA") {
      return "baixa";
    }
    else if (x == "MEDIA") {
      return "media"
    }
    else {
      return "alta"
    }
  }
}
