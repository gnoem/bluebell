import { Component, Input, OnInit } from '@angular/core';
import { post, put } from 'src/api';
import { IList } from 'src/types';

@Component({
  selector: 'list-form',
  templateUrl: './list-form.component.html'
})

export class ListFormComponent implements OnInit {
  @Input() list?: IList;
  @Input() submitText?: string = 'Save';
  @Input() handleResponse?: (res: any) => void;
  @Input() onSuccess?: () => void;

  listName = '';
  options: {
    recurring: string;
    details?: string;
  } = {
    recurring: ''
  }
  listItems: string[] = [];

  ngOnInit() {
    if (this.list) {
      this.listName = this.list.name;
      const [recurring, details] = this.list.recurring.split(':');
      this.options.recurring = recurring ?? this.list.recurring;
      if (recurring === 'weekly') {
        this.options.details = details;
      }
      this.listItems = this.list.members.split('~&~');
    }
  }

  setListName(e: any) {
    this.listName = e.target.value;
  }

  handleFakeSubmit = async () => {
    return 'hi'
  }

  handleSubmit() {
    const submit = this.list ? put : post;
    const route = this.list ? `/lists/${this.list.id}` : `/lists`;
    const recurring = (this.options.recurring === 'weekly')
      ? `${this.options.recurring}:${this.options.details}`
      : `${this.options.recurring}`;
    const data = {
      user: 2,
      name: this.listName,
      recurring,
      members: this.listItems.join('~&~')
    }
    submit(route, data).then(this.handleResponse);
  }
}