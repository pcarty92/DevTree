import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-viewmessages',
  templateUrl: './viewmessages.component.html',
  styleUrls: ['./viewmessages.component.css']
})
export class ViewmessagesComponent implements OnInit {
  messages = [];

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages()
      .pipe(first())
      .subscribe(messages => this.messages = messages);
  }

  sendMessage(senderId) {
    this.router.navigate(['/sendmessage', senderId]);
  }

  deleteMessage(id) {
    this.messageService.deleteMessage(id)
      .pipe(first())
      .subscribe(
        data => {
          alert('Message deleted');
          window.location.reload();
        },
        error => {
          alert('Message could not be deleted');
        }
      );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
