import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  chartData: any;
  chartOptions: any;

  totalClasses = 0;
  totalStudents = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.classes$.subscribe(classes => {
      this.totalClasses = classes.length;
      this.initChart(classes);
    });

    this.dataService.students$.subscribe(students => {
      this.totalStudents = students.length;
    });

    this.initChartOptions();
  }

  private initChart(classes: any[]) {
    // Generate mock attendance data for each class if not present
    const labels = classes.length ? classes.map(c => `Class ${c.section} (${c.roomNo})`) : ['Class A', 'Class B', 'Class C'];
    const startingData = classes.length ? classes.map(() => Math.floor(Math.random() * 20) + 80) : [95, 92, 98]; // Random 80-100%
    const presentData = classes.length ? classes.map((v, i) => startingData[i] - Math.floor(Math.random() * 15)) : [85, 80, 90];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Starting Period %',
          backgroundColor: '#3b82f6',
          data: startingData
        },
        {
          label: 'Present Period %',
          backgroundColor: '#10b981',
          data: presentData
        }
      ]
    };
  }

  private initChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          min: 0,
          max: 100
        }
      }
    };
  }
}
