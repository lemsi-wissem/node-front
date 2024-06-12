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
  selector: 'app-room-list',
  standalone: true,
  imports: [CardModule, TableModule, FormsModule, ToastModule,
    ButtonModule, TagModule, DialogModule, CalendarModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
  providers: [MessageService]
})
export class RoomListComponent implements OnInit{
  constructor(private roomService: RoomService, private messageService: MessageService,private reservationService: ReservationService,
  ) { }
  
  rooms: any[] = [];
  visible: boolean = false;
  start: Date = new Date();
  end: Date = new Date();
  activeRoom!: any;
  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (data: any) => {
        this.rooms = data;
      }
    })
  }

  save(){
    console.log(this.activeRoom)
    let data = {
      start: this.start,
      end: this.end,
      room: this.activeRoom._id
    }
    console.log(data)
    this.reservationService.reserveRoom(data).subscribe({
      next: (data: any) => {
        this.showToast(
          'success',
          'Creation de la reservation',
          'La reservation a été creé avec succès',
        );
        this.reset();
      },
      error: (error: any) => {
        if (error.error.error && error.error.error === 'Conflict with existing reservation!') {
          this.showToast('error', 'Erreur', 'Conflit avec une réservation existante');
        }else{
          this.showToast('error', 'Erreur', 'Erreur inconnue');
        }
      }
    })
  }

  reset(){
    this.activeRoom = null;
    this.visible = false
    this.start = new Date();
    this.end = new Date();

  }

  showDialog(room: any) {
    this.activeRoom = room;
    this.visible = !this.visible;
  } 


  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}


