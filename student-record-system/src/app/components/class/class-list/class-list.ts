import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ClassRecord } from '../../../models/app.models';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './class-list.html',
  styleUrl: './class-list.scss',
})
export class ClassList implements OnInit {
  classes: ClassRecord[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.classes$.subscribe(c => this.classes = c);
  }

  formatTime(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  createClass() {
    this.router.navigate(['/classes/create']);
  }

  viewClass(id: string) {
    this.router.navigate(['/classes/view', id]);
  }

  editClass(id: string) {
    this.router.navigate(['/classes/edit', id]);
  }

  deleteClass(id: string) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.dataService.deleteClass(id);
    }
  }
}
