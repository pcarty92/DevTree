import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

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
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getUserJobs()
      .pipe(first())
      .subscribe(jobs => this.jobs = jobs);
  }

}
