import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-mentor-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule
  ],
  templateUrl: './mentor-form.component.html',
  styleUrl: './mentor-form.component.scss'
})
export class MentorFormComponent implements OnInit {
  isEditMode = false;
  mentorId: string | null = null;

  // Array to hold one or more mentor entries
  mentorsList: any[] = [
    { name: '', email: '', isExistingStaff: false }
  ];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mentorId = params.get('id');
      if (this.mentorId) {
        this.isEditMode = true;
        this.loadMentor();
      }
    });
  }

  loadMentor() {
    if (this.mentorId) {
      const mentor = this.dataService.getMentorById(this.mentorId);
      if (mentor) {
        this.mentorsList[0] = {
          name: mentor.name,
          email: mentor.email || '',
          isExistingStaff: mentor.isExistingStaff || false
        };
      }
    }
  }

  addMentorRow() {
    this.mentorsList.push({ name: '', email: '', isExistingStaff: false });
  }

  removeMentorRow(index: number) {
    if (this.mentorsList.length > 1) {
      this.mentorsList.splice(index, 1);
    }
  }

  isFormValid(): boolean {
    return this.mentorsList.every(m => m.name.trim() && m.email.trim());
  }

  save() {
    if (!this.isFormValid()) return;

    if (this.isEditMode && this.mentorId) {
      const mentorData = this.mentorsList[0];
      this.dataService.updateMentor(this.mentorId, {
        name: mentorData.name.trim(),
        email: mentorData.email.trim(),
        isExistingStaff: mentorData.isExistingStaff
      });
    } else {
      const mentorsToSave = this.mentorsList.map(m => ({
        name: m.name.trim(),
        email: m.email.trim(),
        isExistingStaff: m.isExistingStaff,
        type: 'MENTOR' as const
      }));
      this.dataService.addBulkMentors(mentorsToSave);
    }

    setTimeout(() => {
      this.router.navigate(['/lookup/mentors']);
    }, 100);
  }
}
