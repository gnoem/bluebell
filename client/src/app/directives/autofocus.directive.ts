import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements OnInit {
  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.host.nativeElement.focus();
  }
}