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
  isAuto: boolean = false;


  data: any;
  us: any;
  usuarios: any[] = [];
  seleccionados: any[] = []; // Array para almacenar los elementos seleccionados
  autosSeleccionados: any[] = []; // Array para almacenar los autos seleccionados
  autos: any[] = [];

  
  cambiarAViajes() {
    this.isAuto = false;
  }

  cambiarAAutos() {
    this.isAuto= true;

    //hacer lo mismo que en ngOnInit pero con autos
    this.http.consult_get('/admin/getUsers').subscribe({
      next: (data: any) => {
        this.us = data;
        if (this.us && this.us.usuarios) { // Verificación adicional
          for (let i = 0; i < this.us.usuarios.length; i++) {
            let usuario = this.us.usuarios[i].usuario;
            let tam = this.us.usuarios[i].autosNoAprobados?.length || 0;

            for (let j = 0; j < tam; j++) {
              this.us.usuarios[i].autosNoAprobados[j]['usuario'] = usuario;
              this.autos.push(this.us.usuarios[i].autosNoAprobados[j]);
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

  onCheckboxChangeAutos(event: any, auto: any) {
    if (event.target.checked) {
      this.autosSeleccionados.push(auto);
    } else {
      const index = this.autosSeleccionados.indexOf(auto);
      if (index > -1) {
        this.autosSeleccionados.splice(index, 1);
      }
    }
    console.log('Seleccionados ->', this.autosSeleccionados);
  }

  guardarSeleccionAutos() {
    let json = {
      usuarios: this.autosSeleccionados
    }

    this.http.consult_post('/admin/aceptar/autos', json).subscribe({

      next: (data: any) => {
        console.log('Data ->', data);
        if (data.status == true) {
          Swal.fire('¡Éxito!', 'Los autos han sido aceptados.', 'success');
          
        } else {
          Swal.fire('¡Error!', 'No se pudieron aceptar los autos.', 'error');
        }
      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });

    //eliminar los autos seleccionados de la lista de autos
    for (let i = 0; i < this.autosSeleccionados.length; i++) {
      for (let j = 0; j < this.autos.length; j++) {
        if (this.autosSeleccionados[i]._id == this.autos[j]._id) {
          this.autos.splice(j, 1);
        }
      }
    }

    console.log('Autos seleccionados:', json);
    // Aquí puedes agregar la lógica para manejar los autos seleccionados, por ejemplo, enviar los datos al servidor
  }


  constructor(
    private http: RecepcionistaService,
    private router: Router,
    private usuarioDataService: UsuarioDataService
  ) {}


  //===============================Seccion de viajes================================
 

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
