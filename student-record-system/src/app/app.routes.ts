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
        loadComponent: () => import('./components/lookup/lookup.component').then(m => m.LookupComponent) 
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
