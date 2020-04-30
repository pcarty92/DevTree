import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    return this.http.post(this.BaseURI + '/users/register', user);
  }

}
