import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Job } from '../_models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  readonly BaseURI = 'http://localhost:5000/api';

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

  deleteJob(id) {
    return this.http.delete(this.BaseURI + '/jobs/' + id);
  }

}
