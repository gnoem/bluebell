import { Component, Input, OnInit } from '@angular/core';

interface IDropdownOption {
  value: string;
  display: string;
}

interface IBehavior {
  adjacent: boolean
}

const defaultBehavior = {
  adjacent: false
}

@Component({
  selector: 'input-dropdown',
  templateUrl: './input-dropdown.component.html'
})

export class InputDropdownComponent implements OnInit {
  @Input() name!: string;
  @Input() label?: string;
  @Input() options!: IDropdownOption[];
  @Input() defaultOption!: IDropdownOption;
  @Input() behavior: IBehavior = defaultBehavior;
  @Input() handleSelect!: (value: string) => void;

  opened = false;
  value = '';
  selected = this.defaultOption;
  width = '';

  ngOnInit(): void {
    this.value = this.options[0].value;
    this.selected = this.options.find(option => option.value === this.value) ?? this.selected;
    const getWidth = () => {
      // look at all options and see whose .display property is longest
      const sortedByLength = this.options.map(({ display }) => display).sort((a, b) => {
        return a.length - b.length;
      });
      // use that as the basis for element width
      return `${sortedByLength[0].length + 1}rem`;
    }
    this.width = getWidth();
  }

  setSelected(value: string) {
    this.selected = this.options.find(option => option.value === value) ?? this.selected;
    this.opened = false;
    this.handleSelect(value);
  }
}