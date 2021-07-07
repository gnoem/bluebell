import { Component, Input } from '@angular/core';

interface IBehavior {
  checkboxFirst: boolean,
  group: boolean
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
    checkboxFirst: false,
    group: false
  }
}