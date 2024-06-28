import { Component, OnInit } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { UsuarioDataService } from '../../services/usuarioData/usuario-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listas-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './listas-vehiculos.component.html',
  styleUrl: './listas-vehiculos.component.scss'
})
export class ListasVehiculosComponent implements OnInit {
  constructor(
    private router: Router,
    private usuarioDataService: UsuarioDataService
  ) {}


  data: any;
  autos: any;

  ngOnInit() {
      this.data = this.usuarioDataService.getUsuarioData(); // Obtenemos los datos del usuario
      this.autos = this.data.autosComprados;
    

  }

}
