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
    //testing to see if user is already logged in
    if (this.authService.currentUserValue) {
      alert(this.authService.currentUserValue.username + ' is already logged in');
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
          //test if login was a success
          alert('Log in successful');
          this.router.navigate(['/home']);
        },
        error => {
          alert('There was a database error with login');
        }
      )
  }

  testCurrentUser() {
    if (this.authService.currentUserValue) {
      alert('Current user is: ' + this.authService.currentUserValue.username);
    } else {
      alert('No users currently logged in');
    }
  }
}
