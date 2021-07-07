import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html'
})

export class ListItemsComponent {
  @Input() listItems!: string[];

  editing = false;
  toggleEditing = () => {
    this.editing = !this.editing;
  }

  inputContent = '';
  handleInput = (e: any) => {
    this.inputContent = e.target.value;
  }

  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }

  handleKeydown = (e: any) => {
    if (e.code === 'Escape') {
      this.editing = false;
      this.inputContent = '';
      return;
    }
    if (e.code === 'Enter') {
      this.listItems.push(this.inputContent);
      this.inputContent = '';
      return;
    }
  }

  handleDeleteListItem = (index: number) => {
    this.listItems.splice(index, 1);
  }
}