import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css']
})
export class SendmessageComponent implements OnInit {
  receiverId: number;
  messageForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.receiverId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.messageForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.messageForm.invalid) {
      alert('Message cannot be empty');
      return;
    }

    let message: Message = new Message();

    message.content = this.messageForm.controls['content'].value;
    message.userIdReceiver = this.receiverId;

    this.messageService.createMessage(message)
      .pipe(first())
      .subscribe(
        data => {
          alert('Message sent successfully');
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert('There was a database error with the message');
        }
      );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
