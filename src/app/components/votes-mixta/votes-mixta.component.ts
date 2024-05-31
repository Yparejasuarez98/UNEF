import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votes-mixta',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './votes-mixta.component.html',
  styleUrl: './votes-mixta.component.css'
})
export class VotesMixtaComponent {

  totalVotes = 0;
  totalCompany = 0;
  castVotes = 0;
  delegateVotes = 0;
  votesInPerson = 0;

  constructor(private router: Router) {

  }

  redirect() {
    this.router.navigateByUrl('/resultados');
  }
}
