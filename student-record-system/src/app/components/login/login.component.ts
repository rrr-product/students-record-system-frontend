import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userId = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.remove('p-dark');
      element.setAttribute('data-bs-theme', 'light');
    }
  }

  login() {
    this.error = '';
    if (!this.userId || !this.password) {
      this.error = 'Please enter both User ID and Password';
      return;
    }

    this.authService.login(this.userId, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}
