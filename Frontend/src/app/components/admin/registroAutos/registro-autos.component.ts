import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { RegistroAutosService } from '../../../services/admin/registroAutos/registro-autos.service';


@Component({
  selector: 'app-registro-autos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro-autos.component.html',
  styleUrl: './registro-autos.component.scss'
})
export class RegistroAutosComponent {

  constructor( 
    private http: RegistroAutosService,
    private router: Router
  ){}

  form_registroAuto = new FormGroup({
    nombreAgencia: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required),
  });

  registrarAuto(){
    console.log(
      {
        nombreAgencia: this.form_registroAuto.value.nombreAgencia,
        marca: this.form_registroAuto.value.marca,
        placa: this.form_registroAuto.value.placa,
        modelo: this.form_registroAuto.value.modelo,
        precio: this.form_registroAuto.value.precio,
        ubicacion: this.form_registroAuto.value.ubicacion
      }
    ); if (this.form_registroAuto.valid){
      this.http.consult_post('/admin/registro/auto', this.form_registroAuto.value).subscribe({
        next: (data: any) => {
          if (data.status ){
            console.log('Registro de viaje realizado correctamente');
            alert('Registro de viaje realizado correctamente');
            //this.router.navigate(['/saludo']);
          }else{
            console.log('Error al hacer login');
          }
        },
        error: (error: any) => {
          alert('Error al hacer registro de viaje');
          console.log('Error al hacer registro de viaje');
        }
      });
    } 
  
}
}