import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { ClassRecord, StudentRecord } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-class-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './class-view.html',
  styleUrl: './class-view.scss',
})
export class ClassView implements OnInit, OnDestroy {
  currentClass: ClassRecord | undefined;
  classStudents: StudentRecord[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentClass = this.dataService.getClassById(id);
        if (this.currentClass) {
          const studentsSub = this.dataService.students$.subscribe(students => {
            this.classStudents = students.filter(s => s.classId === this.currentClass?.id);
          });
          this.subscription.add(studentsSub);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
