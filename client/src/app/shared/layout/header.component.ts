import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private router: Router) { }
}