import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  showNavbar: boolean = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/login');
      } 
    });
  }

  redirect() {
    this.router.navigateByUrl('/votos');
  }
}
