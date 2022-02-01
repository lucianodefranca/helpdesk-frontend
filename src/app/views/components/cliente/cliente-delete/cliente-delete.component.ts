import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_cli = "";

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  delete(): void {
    this.service.delete(this.id_cli).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Cliente deletado com sucesso!");
      },
      (err) => {
        if (err.error.error.match("Cliente possui ordens de serviço")) {
          this.service.message(err.error.error);
        }
      }
    );
  }

  findById(): void {
    this.service.findById(this.id_cli).subscribe((resposta) => {
      this.cliente = resposta;
    });
  }

  cancel(): void {
    this.router.navigate(["clientes"]);
  }
}