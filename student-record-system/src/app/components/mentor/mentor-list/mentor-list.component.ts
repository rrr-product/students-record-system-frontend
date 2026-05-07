import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { LookupItem } from '../../../models/app.models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-mentor-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterModule,
    TableModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './mentor-list.component.html',
  styleUrl: './mentor-list.component.scss'
})
export class MentorListComponent implements OnInit {
  mentors$!: Observable<LookupItem[]>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.mentors$ = this.dataService.mentors$;
  }

  deleteMentor(id: string) {
    if (confirm('Are you sure you want to delete this mentor?')) {
      this.dataService.deleteMentor(id);
    }
  }
}
