import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Auth } from '../../interface/auth';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard, 
    public router: Router) { }

  formData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit() {
    if (this.formData.valid) {
      this.authService
        .authenticate(this.formData.value as Auth)
        .subscribe({
          next: () => this.router.navigate(['/task']),
          error: () => alert("Invalid username or password")
        })
    }
  }

}
