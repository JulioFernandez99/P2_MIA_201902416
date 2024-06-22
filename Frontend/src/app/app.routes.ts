import { Routes } from '@angular/router';
import { RegistroComponent } from './components/admin/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';


export const routes: Routes = [
    {
        path: 'registro/usuarios',
        component: RegistroComponent
    },
    {
        path: 'inicio',
        component:InicioComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard/admin',
        component: DashboardComponent

    }
];
