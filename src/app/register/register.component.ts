import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CompareValidatorDirective } from './compare-validator';
import { NgIf } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CompareValidatorDirective, NgIf, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {

  constructor(private authService: AuthService,
     private messageService: MessageService, private route: Router) {}

  credentials = {
    username: '',
    password: '',
    verifyPassword: ''
  };

  register(form: NgForm) {
    if (form.invalid) {
      this.showToast('error', 'Error', 'Please fill in all fields');
      return;
    }

    if (this.credentials.password !== this.credentials.verifyPassword) {
      this.showToast('error', 'Error', 'Passwords do not match');
      return;
    }

    // Registration logic here
    this.authService.register(this.credentials).subscribe({
      next: (data: any) => {
        this.showToast('success', 'Registration', 'Registration successful');
        form.reset();
        this.route.navigate(['/login']);
      },
      error: (error: any) => {
        this.showToast('error', 'Error', 'Registration failed');
      }
    });
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

}
