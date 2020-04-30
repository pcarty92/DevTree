import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly BaseURI = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient
  ) { }

  createMessage(message: Message) {
    return this.http.post<any>(this.BaseURI + '/messages/sendmessage', message);
  }

  getMessages() {
    return this.http.get<Message[]>(this.BaseURI + '/messages/getusermessages');
  }

  deleteMessage(id) {
    return this.http.delete(this.BaseURI + '/messages/' + id);
  }

}
