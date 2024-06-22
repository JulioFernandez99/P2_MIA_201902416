import { Component } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { LoginService } from '../../services/login/login.service';


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
    private router: Router
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
              console.log('Login realizado correctamente');
              alert('Login realizado correctamente');
              //this.router.navigate(['/saludo']);
            }else{
              console.log('Error al hacer login');
            }
          },
          error: (error: any) => {
            alert('Error al hacer login');
            console.log('Error al hacer login');
          }
        });
      } 
    
  }
}


// Validators.required,
// Validators.minLength(8),
// Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')