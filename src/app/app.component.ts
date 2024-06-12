import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Reservation';
  showNavBar: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
       if (event instanceof NavigationEnd) {
        this.showNavBar = !['/login', '/register'].includes(event.urlAfterRedirects);
       }
    })
  }
}
