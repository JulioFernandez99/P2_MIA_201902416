import { Component,OnInit } from '@angular/core';
import { UsuarioDataService } from '../../../services/usuarioData/usuario-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(
    private usuarioDataService: UsuarioDataService
  ) {}

  data: any;

  ngOnInit(){
    this.data = this.usuarioDataService.getUsuarioData(); // Obtenemos los datos del usuario
    
  }

}
