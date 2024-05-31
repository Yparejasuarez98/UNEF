import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [MatTableModule, NgxPaginationModule],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.css'
})
export class ViewResultComponent {
  p = 1;
}
