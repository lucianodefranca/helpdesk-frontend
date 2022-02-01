import { Cliente } from "./../../../../models/cliente";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  constructor(private router: Router, private service: ClienteService) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['clientes']);
  }

  create(): void {
    this.service.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente criado com sucesso!');
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      }
      else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.service.message('CPF inválido!');
      }
    })
  }

}
