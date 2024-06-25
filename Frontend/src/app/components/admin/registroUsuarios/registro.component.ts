import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { RegistroService } from '../../../services/admin/registroUsuarios/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  constructor( 
    private http: RegistroService,
    private router: Router
  ){}

  form_registro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    foto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    conf_password: new FormControl('', Validators.required)
  });

  registrar(){
    console.log(
      {
        nombre: this.form_registro.value.nombre,
        usuario: this.form_registro.value.usuario,
        foto: this.form_registro.value.foto,
        email: this.form_registro.value.email,
        password: this.form_registro.value.password,
        conf_password: this.form_registro.value.conf_password
      }
    );
    if (this.form_registro.valid){
      if (this.form_registro.value.password === this.form_registro.value.conf_password){
        this.http.cosult_post('/admin/registro/usuario/', this.form_registro.value).subscribe({
          next: (data: any) => {
            if (data.status ){
              console.log('Usuario registrado',data.data);
              
              Swal.fire({
                title: 'Usuario registrado',
                text: 'Usuario registrado',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              
              
              //this.router.navigate(['/saludo']);
            }else{
              Swal.fire({
                title: 'Error al registrar usuario',
                text: data.error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });

              
              console.log(data.error);
            }
          },
          error: (error: any) => {
            alert('Error al registrar usuarios');
            console.log('Error al registrar usuario');
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


// Validators.required,
// Validators.minLength(8),
// Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')