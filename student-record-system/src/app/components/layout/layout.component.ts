import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ButtonGroupModule,
    BadgeModule,
    RippleModule,
    ToolbarModule,
    MenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isDarkMode = false;
  menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.checkTheme();
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Classes', icon: 'pi pi-book', routerLink: '/classes' },
      { label: 'Students', icon: 'pi pi-users', routerLink: '/students' },
      { label: 'Lookup Options', icon: 'pi pi-cog', routerLink: '/lookup' }
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActive(url: string): boolean {
    if (url === '/dashboard') {
      return this.router.url === '/dashboard';
    }
    return this.router.url.startsWith(url);
  }

  toggleTheme() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('p-dark');
      this.isDarkMode = element.classList.contains('p-dark');
      if (this.isDarkMode) {
        element.setAttribute('data-bs-theme', 'dark');
      } else {
        element.setAttribute('data-bs-theme', 'light');
      }
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private checkTheme() {
    const theme = localStorage.getItem('theme');
    const element = document.querySelector('html');
    if (theme === 'dark' && element) {
      element.classList.add('p-dark');
      element.setAttribute('data-bs-theme', 'dark');
      this.isDarkMode = true;
    }
  }
}
