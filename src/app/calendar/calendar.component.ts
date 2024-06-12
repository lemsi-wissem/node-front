import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  reservations: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleDateClick.bind(this),
    plugins: [dayGridPlugin],
    events: [] // Initialize with an empty array
  };

  constructor(private reservationService: ReservationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getMyReservations();
  }

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }
  
  getMyReservations() {
    this.reservationService.getMyReservations().subscribe({
      next: (data: any) => {
        this.reservations = data;
        this.updateCalendarEvents();
      }
    });
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.reservations.map((reservation) => {
      const startDate = this.datePipe.transform(reservation.start, 'yyyy-MM-dd');
      const endDate = this.datePipe.transform(reservation.end, 'yyyy-MM-dd');
      return {
        title: reservation.room.name,
        start: startDate ? new Date(startDate) : undefined,
        end: endDate ? new Date(endDate) : undefined
      }
    });
  }
}
