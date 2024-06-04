import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { VotesService } from '../../../components/votes/services/votes.service';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatOptionModule, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  showNavbar: boolean = true;
  section: string;
  roundList: any[] = [];
  round = new FormControl();

  constructor(private router: Router, private votes: VotesService) {
  }

  ngOnInit(): void {
    this.votes.nameSection.subscribe(section => {
      this.section = section;
      if (this.section) {
        this.getRound();
      }
    });
  }

  redirect() {
    this.router.navigateByUrl('/votos');
  }

  selectRound(round: number) {
    this.votes.setSelectedRound(round);
  }

  getRound() {
    this.votes.getRound(this.section).subscribe({
      next: (res: any) => {
        this.roundList = res.data;
          this.selectLastRound();
      }
    });
  }

  selectLastRound(): void {
    if (this.roundList.length > 0) {
      const lastRound = this.roundList[this.roundList.length - 1].round;
      this.round.setValue(lastRound);
    }
  }
}
