import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ClassRecord, StudentRecord } from '../../models/app.models';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-student-record',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TableModule, ButtonModule, 
    InputTextModule, SelectModule, CardModule, DialogModule
  ],
  templateUrl: './student-record.component.html',
  styleUrl: './student-record.component.scss'
})
export class StudentRecordComponent implements OnInit {
  students: StudentRecord[] = [];
  classes: ClassRecord[] = [];
  
  displayDialog = false;
  displayViewDialog = false;
  isEditing = false;
  currentStudent: Partial<StudentRecord> = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.students$.subscribe(s => this.students = s);
    this.dataService.classes$.subscribe(c => this.classes = c);
  }

  getClassName(classId: string): string {
    const cls = this.classes.find(c => c.id === classId);
    return cls ? `${cls.section} (${cls.roomNo})` : 'N/A';
  }

  showDialog() {
    this.isEditing = false;
    this.currentStudent = {};
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  viewStudent(student: StudentRecord) {
    this.currentStudent = { ...student };
    this.displayViewDialog = true;
  }

  editStudent(student: StudentRecord) {
    this.isEditing = true;
    this.currentStudent = { ...student };
    this.displayDialog = true;
  }

  deleteStudent(id: string) {
    this.dataService.deleteStudent(id);
  }

  isFormValid(): boolean {
    return !!(this.currentStudent.name && this.currentStudent.registerNo && this.currentStudent.email && this.currentStudent.classId);
  }

  saveStudent() {
    if (this.isEditing && this.currentStudent.id) {
      this.dataService.updateStudent(this.currentStudent.id, this.currentStudent);
    } else {
      this.dataService.addStudent(this.currentStudent as any);
    }
    this.hideDialog();
  }
}
