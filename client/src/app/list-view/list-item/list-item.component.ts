import { Component, Input } from "@angular/core";

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  @Input() text!: string;
  checked = false;
  toggleChecked() {
    this.checked = !this.checked;
  }
}