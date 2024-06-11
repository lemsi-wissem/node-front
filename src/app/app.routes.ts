import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomListComponent } from './room-list/room-list.component';

export const routes: Routes = [
    {
        path: '',
        component: ReservationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'reservation',
        component: ReservationComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'room-list',
        component: RoomListComponent,
        canActivate: [AuthGuard]
    }
];
