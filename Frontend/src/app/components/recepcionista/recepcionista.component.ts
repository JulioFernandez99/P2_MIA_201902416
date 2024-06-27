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
  seleccionados: any[] = []; // Array para almacenar los elementos seleccionados

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
        if (this.us && this.us.usuarios) { // Verificación adicional
          for (let i = 0; i < this.us.usuarios.length; i++) {
            let usuario = this.us.usuarios[i].usuario;
            let tam = this.us.usuarios[i].viajesNoAprobados?.length || 0;

            for (let j = 0; j < tam; j++) {
              this.us.usuarios[i].viajesNoAprobados[j]['usuario'] = usuario;
              this.usuarios.push(this.us.usuarios[i].viajesNoAprobados[j]);
            }
          }
        } else {
          console.error('La respuesta no contiene usuarios', this.us);
        }
      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });
  }

  onCheckboxChange(event: any, usuario: any) {
    if (event.target.checked) {
      this.seleccionados.push(usuario);
    } else {
      const index = this.seleccionados.indexOf(usuario);
      if (index > -1) {
        this.seleccionados.splice(index, 1);
      }
    }
    console.log('Seleccionados ->', this.seleccionados);
  }

  guardarSeleccion() {
    

    let json = {
      usuarios: this.seleccionados
    }

    this.http.consult_post('/admin/aceptar/viajes', json).subscribe({

      next: (data: any) => {
        console.log('Data ->', data);
        if (data.status == true) {
          Swal.fire('¡Éxito!', 'Los viajes han sido aceptados.', 'success');
          
        } else {
          Swal.fire('¡Error!', 'No se pudieron aceptar los viajes.', 'error');
        }
      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });

    //eliminar los viajes seleccionados de la lista de viajes
    for (let i = 0; i < this.seleccionados.length; i++) {
      for (let j = 0; j < this.usuarios.length; j++) {
        if (this.seleccionados[i]._id == this.usuarios[j]._id) {
          this.usuarios.splice(j, 1);
        }
      }
    }

    console.log('Usuarios seleccionados:', json);
    // Aquí puedes agregar la lógica para manejar los usuarios seleccionados, por ejemplo, enviar los datos al servidor
  }
}
