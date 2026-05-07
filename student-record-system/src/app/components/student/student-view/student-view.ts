import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { StudentRecord, ClassRecord } from '../../../models/app.models';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    ChartModule
  ],
  templateUrl: './student-view.html',
  styleUrl: './student-view.scss',
})
export class StudentView implements OnInit, OnDestroy {
  currentStudent: StudentRecord | undefined;
  classes: ClassRecord[] = [];
  
  chartData: any;
  chartOptions: any;
  private subscription: Subscription = new Subscription();

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
        
        if (this.currentStudent) {
          const attendanceSub = this.dataService.attendance$.subscribe(attendance => {
            const classAttendance = attendance.filter(a => a.classId === this.currentStudent?.classId);
            
            let present = 0;
            let absent = 0;
            let leave = 0;

            classAttendance.forEach(a => {
              const studentRecord = a.records.find(r => r.studentId === this.currentStudent?.id);
              if (studentRecord) {
                if (studentRecord.status === 'Present') present++;
                else if (studentRecord.status === 'Absent') absent++;
                else if (studentRecord.status === 'Leave') leave++;
              }
            });

            const total = present + absent + leave;

            if (total > 0) {
              this.chartData = {
                labels: ['Present', 'Absent', 'Leave'],
                datasets: [
                  {
                    data: [present, absent, leave],
                    backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
                    hoverBackgroundColor: ['#16a34a', '#dc2626', '#d97706']
                  }
                ]
              };
            } else {
              this.chartData = null;
            }

            this.chartOptions = {
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                    color: 'var(--text-color)'
                  }
                }
              }
            };
          });
          this.subscription.add(attendanceSub);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
