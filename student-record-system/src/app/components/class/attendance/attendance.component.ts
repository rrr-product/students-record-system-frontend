import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ClassRecord, StudentRecord, AttendanceRecord } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TableModule,
    DatePickerModule,
    SelectButtonModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
})
export class AttendanceComponent implements OnInit {
  currentClass: ClassRecord | undefined;
  classStudents: StudentRecord[] = [];

  attendanceDate: Date = new Date();
  attendanceTime: Date = new Date();

  statusOptions = [
    { label: 'Present', value: 'Present' },
    { label: 'Absent', value: 'Absent' },
    { label: 'Leave', value: 'Leave' }
  ];

  studentStatuses: { [key: string]: 'Present' | 'Absent' | 'Leave' } = {};

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
          const students = this.dataService.getStudents();
          this.classStudents = students.filter((s: StudentRecord) => s.classId === this.currentClass?.id);

          this.classStudents.forEach((s: StudentRecord) => {
            this.studentStatuses[s.id] = 'Present';
          });
        }
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.attendanceDate && this.attendanceTime && this.classStudents.length > 0);
  }

  saveAttendance() {
    if (!this.currentClass) return;

    const records = this.classStudents.map(s => ({
      studentId: s.id,
      status: this.studentStatuses[s.id]
    }));

    const attendanceRecord: Omit<AttendanceRecord, 'id'> = {
      classId: this.currentClass.id,
      date: this.attendanceDate,
      time: this.attendanceTime,
      records: records
    };

    this.dataService.addAttendance(attendanceRecord);
    this.router.navigate(['/classes/view', this.currentClass.id]);
  }

  cancel() {
    if (this.currentClass) {
      this.router.navigate(['/classes/view', this.currentClass.id]);
    } else {
      this.router.navigate(['/classes']);
    }
  }
}
