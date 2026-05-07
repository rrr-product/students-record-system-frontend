import { Component, OnInit } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { LookupItem } from '../../../models/app.models';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mentor-view',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    RouterModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './mentor-view.component.html',
  styleUrl: './mentor-view.component.scss'
})
export class MentorViewComponent implements OnInit {
  mentor: LookupItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.mentor = this.dataService.getMentorById(id);
      }
    });
  }
}
