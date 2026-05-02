import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { LookupItem } from '../../models/app.models';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-lookup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './lookup.component.html',
  styleUrl: './lookup.component.scss'
})
export class LookupComponent implements OnInit {
  mentors: LookupItem[] = [];
  newMentorName = '';

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.mentors$.subscribe(m => this.mentors = m);
  }

  addMentor() {
    if (this.newMentorName.trim()) {
      this.dataService.addMentor({ name: this.newMentorName.trim(), type: 'MENTOR' });
      this.newMentorName = '';
    }
  }

  deleteMentor(id: string) {
    this.dataService.deleteMentor(id);
  }
}
