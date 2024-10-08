import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { UsuarioDataService } from '../../services/usuarioData/usuario-data.service';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor( 
    private http: LoginService,
    private router: Router,
    private usuarioDataService: UsuarioDataService // Inyecta el servicio
  ){}

  form_login = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login(){
    console.log(
      {
        user: this.form_login.value.user,
        password: this.form_login.value.password,
      }
    );
    if (this.form_login.valid){
        this.http.consult_post('/login', this.form_login.value).subscribe({
          next: (data: any) => {
            if (data.status ){
              console.log('Data ->',data);
              //alert('Bienvenido '+data.data.usuario+'!'+' - Tienes permisos de '+data.data.rol);
              Swal.fire({
                title: 'Bienvenido '+data.data.usuario+'!',
                text: 'Tienes permisos de '+data.data.rol,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

              //hasta que se presione el boton aceptar
              this.usuarioDataService.setUsuarioData(data.data); // Guarda el usuario en el servicio
              if(data.data.rol == 'admin'){

                this.router.navigate(['/admin/dashboard']); 

              }else if(data.data.rol == 'usuario'){

                this.router.navigate(['/dashboard/usuario']);

              }else if(data.data.rol == 'recepcionista'){

                this.router.navigate(['/dashboard/recepcionista']);
              }

              //this.router.navigate(['/saludo']);
            }else{
              Swal.fire({
                title: 'Error!',
                text: data.error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              //alert(data.error);
              console.log(data.error);
            }
          },
          error: (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: 'El usuario no esta registrado',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            //alert('El usuario no esta registrado');
            console.log('El usuarios no esta registrado');
          }
        });
      } 
    
  }
}


// Validators.required,
// Validators.minLength(8),
// Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')