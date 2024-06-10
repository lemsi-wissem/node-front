import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'reservation',
        component: ReservationComponent,
        canActivate: [AuthGuard]
    }
];
