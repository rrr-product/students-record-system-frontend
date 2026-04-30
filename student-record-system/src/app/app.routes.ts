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
        path: 'class-detail', 
        loadComponent: () => import('./components/class-detail/class-detail.component').then(m => m.ClassDetailComponent) 
      },
      { 
        path: 'student-record', 
        loadComponent: () => import('./components/student-record/student-record.component').then(m => m.StudentRecordComponent) 
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
