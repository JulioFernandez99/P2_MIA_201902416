import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDataService {
  http=inject(HttpClient);
  router=inject(Router);

  private usuarioData: any;

  setUsuarioData(data: any) {
    this.usuarioData = data;
  }

  getUsuarioData() {
    return this.usuarioData;
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  apiUrl = environment.apiUrl;

  consult_get(url:string){
    const route = this.apiUrl + url;
    return this.http.get(route,{headers:this.headers});
  }

  consult_post(url:string,data:any){
    const route = this.apiUrl + url;
    return this.http.post(route,data,{headers:this.headers});
  }

  constructor() { }
}
