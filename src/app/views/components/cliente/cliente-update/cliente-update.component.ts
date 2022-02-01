import { FormControl, Validators } from '@angular/forms';
import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_tec = '';

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['clientes']);
  }

  update(): void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente atualizado com sucesso!');
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      }
      else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.service.message('CPF inválido!');
      }
    })
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe((resposta) => {
      this.cliente = resposta;
    })
  }

  errorValidName() {
    if (this.nome.invalid) {
      return 'O NOME deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O CPF deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidPhone() {
    if (this.telefone.invalid) {
      return 'O TELEFONE deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }
}
