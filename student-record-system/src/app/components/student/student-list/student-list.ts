import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { StudentRecord, ClassRecord } from '../../../models/app.models';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, CardModule, InputTextModule
  ],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  students: StudentRecord[] = [];
  classes: ClassRecord[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.students$.subscribe(s => this.students = s);
    this.dataService.classes$.subscribe(c => this.classes = c);
  }

  getClassName(classId: string): string {
    const cls = this.classes.find(c => c.id === classId);
    return cls ? `${cls.section} (Room ${cls.roomNo})` : 'Unassigned';
  }

  createStudent() {
    this.router.navigate(['/students/create']);
  }

  viewStudent(id: string) {
    this.router.navigate(['/students/view', id]);
  }

  editStudent(id: string) {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(id);
    }
  }
}
