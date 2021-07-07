import { Component, Input } from '@angular/core';

@Component({
  selector: 'fancy-input',
  templateUrl: './input.component.html'
})

export class InputComponent {
  @Input() type!: string;
  @Input() name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() onChange!: (e: any) => void;
}