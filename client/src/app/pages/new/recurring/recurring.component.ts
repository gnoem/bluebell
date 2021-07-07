import { Component, Input } from "@angular/core";

@Component({
  selector: 'recurring',
  templateUrl: './recurring.component.html'
})
export class RecurringComponent {
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

  setRecurring = (value: string) => {
    this.options.recurring = value;
    if (this.options.recurring !== 'weekly') {
      delete this.options.details;
    }
  }

  toggleRecurring = () => {
    if (this.options.recurring === 'never') {
      this.setRecurring('daily');
    } else {
      this.setRecurring('never');
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