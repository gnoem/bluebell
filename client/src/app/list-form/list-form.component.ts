import { Component } from '@angular/core';
import { post } from 'src/api';

@Component({
  selector: 'list-form',
  templateUrl: './list-form.component.html'
})

export class ListFormComponent {
  listName = '';
  options: {
    recurring: '' | 'daily' | 'weekly',
    details?: string
  } = {
    recurring: ''
  }
  listItems: string[] = [];

  setListName = (e: any) => {
    this.listName = e.target.value;
  }

  handleSubmit = () => {
    const recurring = (this.options.recurring === 'weekly')
      ? `${this.options.recurring}:${this.options.details}`
      : `${this.options.recurring}`;
    const data = {
      user: 2,
      name: this.listName,
      recurring,
      members: this.listItems.join('~&~')
    }
    post('/lists', data);
  }
}