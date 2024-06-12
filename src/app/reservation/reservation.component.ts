import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RoomService } from '../service/room.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReservationService } from '../service/reservation.service';
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CardModule, TableModule, FormsModule, ToastModule,
    ButtonModule, TagModule, DialogModule, CalendarModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  reservations: any[] = [];
  constructor(public reservationService: ReservationService) { }

  getMyReservations() {
    this.reservationService.getMyReservations().subscribe({
      next: (data: any) => {
        this.reservations = data;
      }
    })
  }

  ngOnInit(): void {
    this.getMyReservations();
  }
}
