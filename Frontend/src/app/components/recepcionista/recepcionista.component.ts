import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioDataService } from '../../services/usuarioData/usuario-data.service';
import Swal from 'sweetalert2';
import { RecepcionistaService } from '../../services/recepcionista/recepcionista.service';

@Component({
  selector: 'app-recepcionista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.scss'] // Corrección aquí
})
export class RecepcionistaComponent implements OnInit {

  data: any;
  us: any;
  usuarios: any[] = [];

  constructor(
    private http: RecepcionistaService,
    private router: Router,
    private usuarioDataService: UsuarioDataService
  ) {}

  ngOnInit() {
    this.data = this.usuarioDataService.getUsuarioData();
  
    this.http.consult_get('/admin/getUsers').subscribe({
      next: (data: any) => {
        this.us = data;
        console.log('Us ->', this.us);

        if (this.us && this.us.usuarios) { // Verificación adicional
          for (let i = 0; i < this.us.usuarios.length; i++) {
            let usuario = this.us.usuarios[i].usuario;
            //console.log('Nombre ->', usuario);

            let tam = this.us.usuarios[i].viajesNoAprobados?.length || 0; // Opcional chaining
            //console.log('Tam ->', tam);

            for (let j = 0; j < tam; j++) {
              console.log('Viaje ->', this.us.usuarios[i].viajesNoAprobados[j]);
              this.us.usuarios[i].viajesNoAprobados[j]['usuario'] = usuario;
              this.usuarios.push(this.us.usuarios[i].viajesNoAprobados[j]);
            }
            // Almacena los usuarios en el array 'usuarios'
            //console.log('Usuarios ->', this.usuarios);
          }

          console.log('Usuarios *->', this.usuarios);
        } else {
          console.error('La respuesta no contiene usuarios', this.us);
        }
      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });
  }
}
