import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { Job } from '../../_models/job';
import { JobService } from '../../_services/job.service';

@Component({
  selector: 'app-userjobs',
  templateUrl: './userjobs.component.html',
  styleUrls: ['./userjobs.component.css']
})
export class UserjobsComponent implements OnInit {
  jobs = [];

  constructor(
    private jobService: JobService,
    private dashboard: DashboardComponent
  ) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getUserJobs()
      .pipe(first())
      .subscribe(jobs => this.jobs = jobs);
  }

  deleteJob(id) {
    this.jobService.deleteJob(id)
      .pipe(first())
      .subscribe(
        data => {
          alert('Job deleted');
          this.dashboard.displayShowUserJobs = false;
        },
        error => {
          alert('Job could not be deleted');
        }
      );
  }

}
