import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [MatTableModule, NgxPaginationModule, MatIconModule],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.css',

})
export class ViewResultComponent {
  p = 1;


  constructor(private router: Router) {}


  goToDetail(){
    this.router.navigate(['resultados/ver-detalle'])
  }
}
