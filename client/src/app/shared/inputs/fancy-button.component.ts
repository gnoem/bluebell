import { Component, Input } from "@angular/core";

interface IBehavior {
  showCheckmark?: boolean;
  fadeCheckmark?: boolean;
}

@Component({
  selector: 'fancy-button',
  templateUrl: './fancy-button.component.html'
})
export class FancyButtonComponent {
  @Input() onClick!: () => any;
  @Input() behavior?: IBehavior = {
    showCheckmark: true,
    fadeCheckmark: true
  }

  clicked = false;
  icon: 'pending' | 'success' | null = null;
  fade = false;

  handleClick = () => {
    if (this.clicked) return;
    this.clicked = true;
    this.icon = 'pending';
    this.onClick().then((result: any) => {
      console.log(result);
      if (!this.behavior?.showCheckmark) return;
      setTimeout(() => {
        this.icon = 'success';
        if (this.behavior?.fadeCheckmark) {
          setTimeout(() => {
            this.fade = true;
            setTimeout(() => {
              this.icon = null;
              this.clicked = false;
              this.fade = false;
            }, 200);
          }, 3000);
        }
      }, 2000);
    });
  }
}