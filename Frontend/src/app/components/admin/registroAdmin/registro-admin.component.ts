import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { RegistroAdminService } from '../../../services/admin/registroAdmin/registro-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.scss'
})
export class RegistroAdminComponent {
  constructor( 
    private http: RegistroAdminService,
    private router: Router
  ){}
  imagen: any = '';
  imagen_path: any = '';

  form_registro_admin = new FormGroup({
    path: new FormControl('',),
    nombre: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    foto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    conf_password: new FormControl('', Validators.required)
  });

  registrarAdmin(){
    console.log(
      {
        nombre: this.form_registro_admin.value.nombre,
        usuario: this.form_registro_admin.value.usuario,
        foto: this.form_registro_admin.value.foto,
        email: this.form_registro_admin.value.email,
        password: this.form_registro_admin.value.password,
        conf_password: this.form_registro_admin.value.conf_password
      }
    );
    if (this.form_registro_admin.valid){
      if (this.form_registro_admin.value.password === this.form_registro_admin.value.conf_password){
        const index = this.imagen_path.indexOf(",");
        this.imagen_path = this.imagen_path.slice(index + 1);
        this.form_registro_admin.value.foto = this.imagen_path;
        this.form_registro_admin.value.path = this.imagen.name;
        this.http.consult_post('/admin/registro/Admin', this.form_registro_admin.value).subscribe({
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
            alert('Error al registrar usuario');
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
  onFileSelected(event: any){
    // Seleccionar el archivo y convertirlo a base64
    this.imagen = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      console.log(reader.result);
      this.imagen_path = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
  }

  encodeFileAsBase64(file:any){
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () =>{
        console.log(reader.result);
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }


}


// Validators.required,
// Validators.minLength(8),
// Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
