import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Chamado } from "../models/chamado";

@Injectable({
  providedIn: "root",
})
export class ChamadoService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Chamado[]> {
    const url = `${this.baseUrl}/chamados`;
    return this.http.get<Chamado[]>(url);
  }

  create(chamado: Chamado): Observable<Chamado> {
    const url = `${this.baseUrl}/chamados`;
    return this.http.post<Chamado>(url, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    const url = `${this.baseUrl}/chamados`;
    return this.http.put<Chamado>(url, chamado);
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/chamados/${id}`;
    return this.http.delete<void>(url);
  }

  findById(id: any): Observable<Chamado> {
    const url = `${this.baseUrl}/chamados/${id}`;
    return this.http.get<Chamado>(url);
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
