import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { StudentRecord, ClassRecord } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})
export class StudentForm implements OnInit {
  isEditing = false;
  currentStudent: Partial<StudentRecord> = {};
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
        this.isEditing = true;
        const student = this.dataService.getStudentById(id);
        if (student) {
          this.currentStudent = { ...student };
        }
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.currentStudent.name && this.currentStudent.registerNo && this.currentStudent.email);
  }

  saveStudent() {
    if (this.isEditing && this.currentStudent.id) {
      this.dataService.updateStudent(this.currentStudent.id, this.currentStudent);
    } else {
      this.dataService.addStudent(this.currentStudent as any);
    }
    this.router.navigate(['/students']);
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}
