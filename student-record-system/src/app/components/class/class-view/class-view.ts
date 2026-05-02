import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ClassRecord } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-class-view',
  standalone: true,
  imports: [
    CommonModule, CardModule, ButtonModule
  ],
  templateUrl: './class-view.html',
  styleUrl: './class-view.scss',
})
export class ClassView implements OnInit {
  currentClass: ClassRecord | undefined;

  constructor(
    private dataService: DataService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentClass = this.dataService.getClassById(id);
      }
    });
  }

  formatTime(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  goBack() {
    this.router.navigate(['/classes']);
  }

  editClass() {
    if (this.currentClass) {
      this.router.navigate(['/classes/edit', this.currentClass.id]);
    }
  }
}
