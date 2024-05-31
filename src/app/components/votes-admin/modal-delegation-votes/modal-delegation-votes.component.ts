import { Component, Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-delegation-votes',
  standalone: true,
  imports: [MatSelectModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './modal-delegation-votes.component.html',
  styleUrl: './modal-delegation-votes.component.css'
})
export class ModalDelegationVotesComponent {

  constructor(public dialogRef: MatDialogRef<ModalDelegationVotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {

  }
  mixta = 0;
  votes = '';

  redirect() {
    this.router.navigateByUrl('/votos/detalle');
  }
}
