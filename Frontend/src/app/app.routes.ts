import { Routes } from '@angular/router';
import { RegistroComponent } from './components/admin/registroUsuarios/registro.component';
import { RegistroViajesComponent } from './components/admin/registroViajes/registro-viajes.component';
import { RegistroAutosComponent } from './components/admin/registroAutos/registro-autos.component';
import { RegistroRecepcionistaComponent } from './components/admin/registroRecepcionista/registro-recepcionista.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';



export const routes: Routes = [
    {
        path: 'admin/registro/usuario',
        component: RegistroComponent
    },
    {
        path: 'admin/registro/viaje',
        component: RegistroViajesComponent
    },
    {
        path: 'admin/registro/auto',
        component: RegistroAutosComponent
    },
    {
        path: 'admin/registro/recepcionista',
        component: RegistroRecepcionistaComponent
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
