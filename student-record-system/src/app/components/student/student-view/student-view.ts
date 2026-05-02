import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { StudentRecord, ClassRecord } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './student-view.html',
  styleUrl: './student-view.scss',
})
export class StudentView implements OnInit {
  currentStudent: StudentRecord | undefined;
  classes: ClassRecord[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataService.classes$.subscribe(c => this.classes = c);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentStudent = this.dataService.getStudentById(id);
      }
    });
  }

  getClassName(classId: string): string {
    const cls = this.classes.find(c => c.id === classId);
    return cls ? `${cls.section} (Room ${cls.roomNo})` : 'Unassigned';
  }

  goBack() {
    this.router.navigate(['/students']);
  }

  editStudent() {
    if (this.currentStudent) {
      this.router.navigate(['/students/edit', this.currentStudent.id]);
    }
  }
}
