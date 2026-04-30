import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ClassRecord, LookupItem } from '../../models/app.models';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TableModule, ButtonModule, 
    InputTextModule, SelectModule, CardModule, DatePickerModule, DialogModule
  ],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.scss'
})
export class ClassDetailComponent implements OnInit {
  classes: ClassRecord[] = [];
  mentors: LookupItem[] = [];
  
  displayDialog = false;
  isEditing = false;
  currentClass: Partial<ClassRecord> = {};
  
  startedAtTime: Date | null = null;
  endsAtTime: Date | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.classes$.subscribe(c => this.classes = c);
    this.dataService.mentors$.subscribe(m => this.mentors = m);
  }

  showDialog() {
    this.isEditing = false;
    this.currentClass = {};
    this.startedAtTime = null;
    this.endsAtTime = null;
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  editClass(cls: ClassRecord) {
    this.isEditing = true;
    this.currentClass = { ...cls };
    this.startedAtTime = typeof cls.classStartedAt === 'string' ? new Date(cls.classStartedAt) : cls.classStartedAt;
    this.endsAtTime = typeof cls.classEndsAt === 'string' ? new Date(cls.classEndsAt) : cls.classEndsAt;
    this.displayDialog = true;
  }

  deleteClass(id: string) {
    this.dataService.deleteClass(id);
  }

  isFormValid(): boolean {
    return !!(this.currentClass.section && this.currentClass.roomNo && this.startedAtTime && this.endsAtTime);
  }

  saveClass() {
    this.currentClass.classStartedAt = this.startedAtTime as Date;
    this.currentClass.classEndsAt = this.endsAtTime as Date;

    if (this.isEditing && this.currentClass.id) {
      this.dataService.updateClass(this.currentClass.id, this.currentClass);
    } else {
      this.dataService.addClass(this.currentClass as any);
    }
    this.hideDialog();
  }

  formatTime(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
