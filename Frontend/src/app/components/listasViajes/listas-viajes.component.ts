import { Component, OnInit } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { UsuarioDataService } from '../../services/usuarioData/usuario-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listas-viajes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './listas-viajes.component.html',
  styleUrl: './listas-viajes.component.scss'
})
export class ListasViajesComponent implements OnInit {
  constructor(
    private router: Router,
    private usuarioDataService: UsuarioDataService
  ) {}

  data: any;
  viajes: any;

  ngOnInit() {
      this.data = this.usuarioDataService.getUsuarioData(); // Obtenemos los datos del usuario
      this.viajes = this.data.viajesComprados;
    
  }

}
