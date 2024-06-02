import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-votes-mixta-detalle',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatSlideToggleModule, NgxPaginationModule,MatIconModule],
  templateUrl: './votes-mixta-detalle.component.html',
  styleUrl: './votes-mixta-detalle.component.css'
})
export class VotesMixtaDetalleComponent {

  formMixtaDetalle: FormGroup;
  p = 1;

  constructor(private fb: FormBuilder){
    this.formMixtaDetalle = this.fb.group({
      associatedCompany: '',
      nif: '',
      type: '',
      associatedVoted: '',
      nifVoted: ''
    });
  }

}
