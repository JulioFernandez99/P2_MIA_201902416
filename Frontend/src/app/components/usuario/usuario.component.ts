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

      //eliminar viajes seleccionados de la lista de viajes
      for (let i = 0; i < this.viajesSeleccionados.length; i++) {
        for (let j = 0; j < this.viajes.length; j++) {
          if (this.viajesSeleccionados[i]._id == this.viajes[j]._id) {
            this.viajes.splice(j, 1)
          }
          
        }
          
        }

    if  (this.viajesSeleccionados.length > 0) {
      Swal.fire('¡Viajes guardados!', 'Los viajes seleccionados han sido guardados.', 'success');
    }else{
      Swal.fire('¡Error!', 'No se han seleccionado viajes.', 'error');
    }

    // Ejemplo de cómo podrías usar SweetAlert para mostrar un mensaje
    
  }
  
  

  ngOnInit() {
    this.data = this.usuarioDataService.getUsuarioData();
    //consulta a mi base de datos mongo Viajes
    
    this.http.consult_post('/admin/viajes',null).subscribe({
      next: (data: any) => {

        try {
          
        //verificar que los viajes de data.viajes no estén en la lista de viajes asignados
          

        
        this.viajes = data.viajes;
        let tam = this.viajes?.length || 0;

        
        if (this.viajes?.length||0 > 0) {

          if (this.data.viajesNoAprobados?.length || 0 > 0) {
            for (let i = 0; i < this.data.viajesNoAprobados.length; i++) {

              for (let j = 0; j < this.viajes?.length || 0; j++) {
                if (this.data.viajesNoAprobados[i]._id == this.viajes[j]._id) {
                  this.viajes.splice(j, 1)
                }

                
              }      
          } 
        }


        if (this.data.viajesComprados?.length || 0 > 0) {
          for (let i = 0; i < this.data.viajesComprados?.length || 0; i++) {

            for (let j = 0; j < this.viajes?.length || 0; j++) {
              if (this.data.viajesComprados[i]._id == this.viajes[j]._id) {
                this.viajes.splice(j, 1)
              }

              
            }      
        } 
      }
    
        
        
      }else{
        Swal.fire('¡No hay viajes!', 'No hay viajes disponibles para asignar.', 'warning');
      }
        


        //console.log('Data usuario ->', this.data);
        }
        catch (error) {
          console.log('Error ->', error);
        }


      },
      error: (error: any) => {
        console.log('Error ->', error);
      }
    });
  

    if (this.viajes.length == 0) {
      Swal.fire('¡No hay viajes!', 'No hay viajes disponibles para asignar.', 'warning');
    }

    console.log('Usuario data:', this.data.usuario);
  }
}
