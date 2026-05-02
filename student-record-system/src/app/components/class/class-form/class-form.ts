import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ClassRecord, LookupItem } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, CardModule, ButtonModule, 
    InputTextModule, SelectModule, DatePickerModule
  ],
  templateUrl: './class-form.html',
  styleUrl: './class-form.scss',
})
export class ClassForm implements OnInit {
  isEditing = false;
  currentClass: Partial<ClassRecord> = {};
  mentors: LookupItem[] = [];
  
  startedAtTime: Date | null = null;
  endsAtTime: Date | null = null;

  constructor(
    private dataService: DataService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataService.mentors$.subscribe(m => this.mentors = m);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        const cls = this.dataService.getClassById(id);
        if (cls) {
          this.currentClass = { ...cls };
          this.startedAtTime = typeof cls.classStartedAt === 'string' ? new Date(cls.classStartedAt) : cls.classStartedAt;
          this.endsAtTime = typeof cls.classEndsAt === 'string' ? new Date(cls.classEndsAt) : cls.classEndsAt;
        }
      }
    });
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
    this.router.navigate(['/classes']);
  }

  cancel() {
    this.router.navigate(['/classes']);
  }
}
