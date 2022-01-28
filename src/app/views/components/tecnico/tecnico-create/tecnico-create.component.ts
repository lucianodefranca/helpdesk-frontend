import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel():void {
    this.router.navigate(['tecnicos'])
  }
}
