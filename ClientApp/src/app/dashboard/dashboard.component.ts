import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  displayPostJob = false;
  displayShowUserJobs = false;
  displayShowNonUserJobs = false;

  constructor(
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
   }

  ngOnInit() {
  }

  onPostJob() {
    this.displayPostJob = !this.displayPostJob;
    this.displayShowUserJobs = false;
    this.displayShowNonUserJobs = false;
  }

  onShowUserJobs() {
    this.displayShowUserJobs = !this.displayShowUserJobs;
    this.displayPostJob = false;
    this.displayShowNonUserJobs = false;
  }

  onShowAllJobs() {
    this.displayShowNonUserJobs = !this.displayShowNonUserJobs;
    this.displayPostJob = false;
    this.displayShowUserJobs = false;
  }

}
