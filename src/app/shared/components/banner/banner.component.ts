import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { VotesService } from '../../../components/votes/services/votes.service';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private authService: AuthService, private votes: VotesService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/login');
      } 
    });
  }

  ngOnInit(): void {
    this.votes.nameSection.subscribe(section => {
      this.section = section;
      if(this.section){
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

  getRound(){
    this.votes.getRound(this.section).subscribe({
      next: (res: any) => {
        this.roundList = res.data;
      }
    });
  }
}
