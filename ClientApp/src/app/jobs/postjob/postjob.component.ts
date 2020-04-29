import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { JobService } from '../../_services/job.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  jobForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private dashboard: DashboardComponent
  ) { }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      jobname: ['', Validators.required],
      jobdescription: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      alert('There was a validation error with the job');
      return;
    }

    this.jobService.createJob(
      this.jobForm.controls['jobname'].value,
      this.jobForm.controls['jobdescription'].value,
      this.jobForm.controls['price'].value
    )
      .pipe(first())
      .subscribe(
        data => {
          alert('Job successfully posted');
          this.dashboard.displayPostJob = false;
        },
        error => {
          alert('There was a database error with job posting');
        }
      );

  }

}
