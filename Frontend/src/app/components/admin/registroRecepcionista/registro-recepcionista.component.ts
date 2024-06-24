import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { RegistroRecepcionistaService } from '../../../services/admin/registroRecepcionista/registro-recepcionista.service';


@Component({
  selector: 'app-registro-recepcionista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro-recepcionista.component.html',
  styleUrl: './registro-recepcionista.component.scss'
})
export class RegistroRecepcionistaComponent {


  constructor( 
    private http: RegistroRecepcionistaService,
    private router: Router
  ){}

  form_registroRecepcionista = new FormGroup({
    nombre: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    foto: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    conf_password: new FormControl('', Validators.required),
  });

  registrarRecepcionista(){
    console.log(
      {
        nombre: this.form_registroRecepcionista.value.nombre,
        usuario: this.form_registroRecepcionista.value.usuario,
        foto: this.form_registroRecepcionista.value.foto,
        correo: this.form_registroRecepcionista.value.correo,
        password: this.form_registroRecepcionista.value.password,
        conf_password: this.form_registroRecepcionista.value.conf_password
        
      }
    ); 
    if (this.form_registroRecepcionista.valid){
      if (this.form_registroRecepcionista.value.password === this.form_registroRecepcionista.value.conf_password){
        this.http.consult_post('/admin/registro/recepcionista', this.form_registroRecepcionista.value).subscribe({
          next: (data: any) => {
            if (data.status ){
              console.log('Recepcionista registrada');
              alert('Recepcionista registrada');
              //this.router.navigate(['/saludo']);
            }else{
              alert(data.error);
              console.log('Error al registrar Recepcionista');
            }
          },
          error: (error: any) => {
            alert('Error al registrar recepcionista');
            console.log('Error al registrar recepcionista');
          }
        });
      } else {
        alert('Las contraseñas no coinciden');
        console.log('Las contraseñas no coinciden');
      }
    } else {
      alert('Formulario invalido');
      console.log('Formulario invalido');
    }
  
}
}
