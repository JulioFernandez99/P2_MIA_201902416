import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {
  http = inject(HttpClient);
  router = inject(Router);

  private usuarioDataKey = 'usuarioData'; // Clave para localStorage

  setUsuarioData(data: any) {
    localStorage.setItem(this.usuarioDataKey, JSON.stringify(data));
  }

  getUsuarioData() {
    const data = localStorage.getItem(this.usuarioDataKey);
    return data ? JSON.parse(data) : null;
  }

  clearUsuarioData() {
    localStorage.removeItem(this.usuarioDataKey);
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  apiUrl = environment.apiUrl;

  consult_get(url: string) {
    const route = this.apiUrl + url;
    return this.http.get(route, { headers: this.headers });
  }

  consult_post(url: string, data: any) {
    const route = this.apiUrl + url;
    return this.http.post(route, data, { headers: this.headers });
  }

  constructor() { }
}
