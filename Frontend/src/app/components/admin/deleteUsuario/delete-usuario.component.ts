import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { DeleteUsuarioService } from '../../../services/admin/deleteUsuario/delete-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './delete-usuario.component.html',
  styleUrl: './delete-usuario.component.scss'
})
export class DeleteUsuarioComponent {
  

  constructor( 
    private http: DeleteUsuarioService,
    private router: Router,
  ){}

  form_delete = new FormGroup({
    usuario: new FormControl('', Validators.required),
  });

  deleteUsuario(){
    console.log(
      {
       
        usuario: this.form_delete.value.usuario,
      }
    );
    if (this.form_delete.valid){
      
        this.http.consult_post('/admin/deleteUsuario', this.form_delete.value).subscribe({
          next: (data: any) => {
            if (data.status ){
              console.log('Usuario eliminado',data.data);
              
              Swal.fire({
                title: 'Usuario eliminado',
                text: 'Usuario eliminado',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              
              
              //this.router.navigate(['/saludo']);
            }else{
              Swal.fire({
                title: 'Error al eliminar usuario',
                text: data.error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });

             
              console.log(data.error);
            }
          },
          error: (error: any) => {
            alert('Error al eliminar usuario');
            console.log('Error al eliminar usuario');
          }
        });
      
    } else {
      alert('Formulario invalido');
      console.log('Formulario invalido');
    }
  }
}


// Validators.required,
// Validators.minLength(8),
// Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
