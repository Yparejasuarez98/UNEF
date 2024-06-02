import { Component, Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Enterprise } from '../models/models';
import { VotesAdminService } from '../services/votes-admin.service';
import Swal from 'sweetalert2';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-delegation-votes',
  standalone: true,
  imports: [MatSelectModule, MatIconModule, MatButtonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './modal-delegation-votes.component.html',
  styleUrl: './modal-delegation-votes.component.css'
})
export class ModalDelegationVotesComponent {

  mixta = '';
  votes = 0;
  listEnterprise: Enterprise[] = [];
  company = new FormControl('');

  constructor(public dialogRef: MatDialogRef<ModalDelegationVotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Enterprise, private votesAdminService: VotesAdminService) {

    this.votes = this.data.total_votes;
    this.mixta = this.data.section;
  }

  getEnterprise() {
    this.votesAdminService.getEnterprise(this.data.section, 'default', 1, 1000).subscribe({
      next: (res) => {
        this.listEnterprise = res;
      }, error: (err) => {
        Swal.fire("Error!", err.error.message, 'error');
      }
    });
  }

  confirm() {
    this.data.nifSelected = this.company?.value;
    debugger
    this.dialogRef.close(this.data);
  }
}
