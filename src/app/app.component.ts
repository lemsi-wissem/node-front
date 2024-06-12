import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  title = 'Reservation';
  showNavBar: boolean = false;
  path: string = '/';
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
       if (event instanceof NavigationEnd) {
        this.showNavBar = !['/login', '/register'].includes(event.urlAfterRedirects);
        this.path = event.urlAfterRedirects; // Update path on navigation change

       }
    })
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    }
}
