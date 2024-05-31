import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  code = new FormControl<string>('', Validators.required);

  constructor(private router: Router, private loginService: LoginService, private sharedService: SharedService) {

  }

  login() {
    this.code.markAllAsTouched()
    if (this.code.invalid) {
      return
    }
    this.loginService.login(this.code.value!).subscribe({
      next: (res: any) => {
        this.sharedService.setRol(res.type);
        localStorage.setItem('token', res.toke);
        this.router.navigateByUrl('/votos');
      }, error: (res) => {
        Swal.fire('Error!', res.message, 'error');
      }
    });
  }
}
