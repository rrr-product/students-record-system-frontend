import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule, BadgeModule, RippleModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isDarkMode = false;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.checkTheme();
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Classes', icon: 'pi pi-book', routerLink: '/class-detail' },
      { label: 'Students', icon: 'pi pi-users', routerLink: '/student-record' },
      { label: 'Lookup Options', icon: 'pi pi-cog', routerLink: '/lookup' }
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('p-dark');
      this.isDarkMode = element.classList.contains('p-dark');
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private checkTheme() {
    const theme = localStorage.getItem('theme');
    const element = document.querySelector('html');
    if (theme === 'dark' && element) {
      element.classList.add('p-dark');
      this.isDarkMode = true;
    }
  }
}
