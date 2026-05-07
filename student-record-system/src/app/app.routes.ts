import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'lookup', 
        children: [
          {
            path: '',
            loadComponent: () => import('./components/lookup/lookup.component').then(m => m.LookupComponent)
          },
          { 
            path: 'mentors', 
            loadComponent: () => import('./components/mentor/mentor-list/mentor-list.component').then(m => m.MentorListComponent) 
          },
          { 
            path: 'mentors/create', 
            loadComponent: () => import('./components/mentor/mentor-form/mentor-form.component').then(m => m.MentorFormComponent) 
          },
          { 
            path: 'mentors/edit/:id', 
            loadComponent: () => import('./components/mentor/mentor-form/mentor-form.component').then(m => m.MentorFormComponent) 
          },
          { 
            path: 'mentors/view/:id', 
            loadComponent: () => import('./components/mentor/mentor-view/mentor-view.component').then(m => m.MentorViewComponent) 
          }
        ]
      },
      { 
        path: 'classes', 
        loadComponent: () => import('./components/class/class-list/class-list').then(m => m.ClassList) 
      },
      { 
        path: 'classes/create', 
        loadComponent: () => import('./components/class/class-form/class-form').then(m => m.ClassForm) 
      },
      { 
        path: 'classes/edit/:id', 
        loadComponent: () => import('./components/class/class-form/class-form').then(m => m.ClassForm) 
      },
      { 
        path: 'classes/view/:id', 
        loadComponent: () => import('./components/class/class-view/class-view').then(m => m.ClassView) 
      },
      { 
        path: 'classes/:id/attendance', 
        loadComponent: () => import('./components/class/attendance/attendance.component').then(m => m.AttendanceComponent) 
      },
      { 
        path: 'students', 
        loadComponent: () => import('./components/student/student-list/student-list').then(m => m.StudentList) 
      },
      { 
        path: 'students/create', 
        loadComponent: () => import('./components/student/student-form/student-form').then(m => m.StudentForm) 
      },
      { 
        path: 'students/edit/:id', 
        loadComponent: () => import('./components/student/student-form/student-form').then(m => m.StudentForm) 
      },
      { 
        path: 'students/view/:id', 
        loadComponent: () => import('./components/student/student-view/student-view').then(m => m.StudentView) 
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
