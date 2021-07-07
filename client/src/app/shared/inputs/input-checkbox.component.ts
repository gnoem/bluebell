import { Component, Input } from '@angular/core';

interface IBehavior {
  listItem?: boolean;
  checkboxFirst?: boolean;
  group?: boolean;
}

@Component({
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html'
})

export class InputCheckboxComponent {
  @Input() name!: string;
  @Input() label?: string;
  @Input() checked: boolean = false;
  @Input() onChange!: () => void;
  @Input() behavior: IBehavior = {
    listItem: false,
    checkboxFirst: false,
    group: false
  }
}