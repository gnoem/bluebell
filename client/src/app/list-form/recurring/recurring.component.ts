import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'recurring',
  templateUrl: './recurring.component.html'
})
export class RecurringComponent implements OnInit {
  @Input() options!: {
    recurring: string,
    details?: string
  }
  
  dropdownOptions = [
    { value: 'daily', display: 'Daily' },
    { value: 'weekly', display: 'Weekly' },
  ]

  defaultOption = this.dropdownOptions[0];

  weekdays: string[] = [];

  weekOptions = [
    { value: 'sun', display: 'Sun' },
    { value: 'mon', display: 'Mon' },
    { value: 'tue', display: 'Tue' },
    { value: 'wed', display: 'Wed' },
    { value: 'thu', display: 'Thu' },
    { value: 'fri', display: 'Fri' },
    { value: 'sat', display: 'Sat' },
  ]

  ngOnInit() {
    // if editing an existing form, will need to set those values once this.options is initiated
    this.defaultOption = this.dropdownOptions.find(option => option.value === this.options.recurring) ?? this.dropdownOptions[0];
    this.weekdays = this.options.details?.split('&') ?? [];
  }

  setRecurring = (value: string) => {
    this.options.recurring = value;
    if (this.options.recurring !== 'weekly') {
      delete this.options.details;
    }
  }

  toggleRecurring = () => {
    if (this.options.recurring) {
      this.setRecurring('');
    } else {
      this.setRecurring('daily');
    }
  }

  toggleWeekday = (value: string) => () => {
    const index = this.weekdays.indexOf(value);
    const isInArray = index !== -1;
    if (isInArray) {
      this.weekdays.splice(index, 1);
    } else {
      this.weekdays.push(value);
    }
    this.options.details = this.weekdays.join('&');
  }
}