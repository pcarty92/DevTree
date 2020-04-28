import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('There was a validation error with login');
      return;
    }

    this.authService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    )
      .pipe(first())
      .subscribe(
        data => {
          alert('Hello ' + this.authService.currentUserValue.name);
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert('There was a database error with login');
        }
      );
  }
}
