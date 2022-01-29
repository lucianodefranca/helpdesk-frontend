import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  errorValidName() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres!'
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O CPF deve ter entre 11 e 15 caracteres!'
    }
    return false;
  }

  errorValidPhone() {
    if (this.telefone.invalid) {
      return 'O telefone deve ter entre 11 e 18 caracteres!'
    }
    return false;
  }

}
