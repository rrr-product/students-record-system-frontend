import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lookup',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './lookup.component.html',
  styleUrl: './lookup.component.scss'
})
export class LookupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
