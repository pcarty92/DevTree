import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Job } from '../../_models/job';
import { JobService } from '../../_services/job.service';

@Component({
  selector: 'app-alljobs',
  templateUrl: './alljobs.component.html',
  styleUrls: ['./alljobs.component.css']
})
export class AlljobsComponent implements OnInit {
  jobs = [];

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getNonUserJobs()
      .pipe(first())
      .subscribe(jobs => this.jobs = jobs);
  }

}
