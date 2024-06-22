import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'inicio',
        component:InicioComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
