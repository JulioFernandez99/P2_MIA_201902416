import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { RegistroViajesService } from '../../../services/admin/registroViajes/registro-viajes.service';


@Component({
  selector: 'app-registro-viajes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro-viajes.component.html',
  styleUrl: './registro-viajes.component.scss'
})
export class RegistroViajesComponent {

  constructor( 
    private http: RegistroViajesService,
    private router: Router
  ){}

  form_registroViaje = new FormGroup({
    nombreAgencia: new FormControl('', Validators.required),
    ciudadOrigen: new FormControl('', Validators.required),
    ciudadDestino: new FormControl('', Validators.required),
    diasDeVuelo: new FormControl('', Validators.required),
    precioDeVuelo: new FormControl('', Validators.required),
    
  });

  registrarViaje(){
    console.log(
      {
        nombreAgencia: this.form_registroViaje.value.nombreAgencia,
        ciudadOrigen: this.form_registroViaje.value.ciudadOrigen,
        ciudadDestino: this.form_registroViaje.value.ciudadDestino,
        diasDeVuelo: this.form_registroViaje.value.diasDeVuelo,
        precioDeVuelo: this.form_registroViaje.value.precioDeVuelo
      }
    ); if (this.form_registroViaje.valid){
      this.http.consult_post('/admin/registro/viaje', this.form_registroViaje.value).subscribe({
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