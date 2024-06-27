import { Component, OnInit } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { UsuarioDataService } from '../../services/usuarioData/usuario-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit { // Implementa OnInit
  data: any;
  viajes: any;
  viajesSeleccionados: any[] = [];
  infoUsuario: any;

  constructor(
    private http: UsuarioDataService,
    private router: Router,
    private usuarioDataService: UsuarioDataService
  ) {}

  toggleSeleccion(index: number) {
    if (this.viajesSeleccionados.includes(this.viajes[index])) {
      // Si ya está seleccionado, lo eliminamos del array de seleccionados
      this.viajesSeleccionados = this.viajesSeleccionados.filter(viaje => viaje !== this.viajes[index]);
    } else {
      // Si no está seleccionado, lo agregamos al array de seleccionados
      this.viajesSeleccionados.push(this.viajes[index]);
    }
  }

  guardarSeleccionados() {
    // Aquí puedes realizar la lógica para guardar los viajes seleccionados en tu base de datos
    console.log('Viajes seleccionados:', this.viajesSeleccionados);

    this.infoUsuario ={
      usuario: this.data.usuario,
      viajes: this.viajesSeleccionados
    }

    this.http.consult_post('/admin/asignar/viajes',this.infoUsuario).subscribe({
      next: (data: any) => {
        console.log('Viajes asignados ->', data);
      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });



    // Ejemplo de cómo podrías usar SweetAlert para mostrar un mensaje
    Swal.fire('¡Viajes guardados!', 'Los viajes seleccionados han sido guardados.', 'success');
  }
  
  

  ngOnInit() {
    this.data = this.usuarioDataService.getUsuarioData();
    //consulta a mi base de datos mongo Viajes
    
    this.http.consult_post('/admin/viajes',null).subscribe({
      next: (data: any) => {
        this.viajes = data.viajes;
        console.log('Viajes ->', data.viajes);
      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });
  



    console.log('Usuario data:', this.data.usuario);
  }
}

