import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Job } from '../_models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  readonly BaseURI = 'http://localhost:56027/api';

  constructor(
    private http: HttpClient
  ) { }

  createJob(jobname, jobdescription, price) {
    return this.http.post<any>(this.BaseURI + '/jobs/postjob', { jobname, jobdescription, price });
  }

  getUserJobs() {
    return this.http.get<Job[]>(this.BaseURI + '/jobs/getuserjobs');
  }

  getNonUserJobs() {
    return this.http.get<Job[]>(this.BaseURI + '/jobs/getnonuserjobs');
  }

}
