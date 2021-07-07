import { Component } from '@angular/core';

@Component({
  selector: 'page-create-list',
  templateUrl: './create-list.component.html'
})

export class CreateListComponent {
  listName = '';
  options: {
    recurring: 'never' | 'daily' | 'weekly',
    details?: string
  } = {
    recurring: 'never'
  }
  listItems: string[] = [];

  setListName = (e: any) => {
    this.listName = e.target.value;
  }

  handleSubmit = () => {
    console.log(`
listName: ${this.listName}
options.recurring: ${this.options.recurring}
options.details: ${this.options.details}
listItems: ${this.listItems.join(', ')}
`)
  }
}