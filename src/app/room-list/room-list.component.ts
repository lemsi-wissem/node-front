import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RoomService } from '../service/room.service';
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CardModule, TableModule, 
    ButtonModule, TagModule, DialogModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit{
  constructor(private roomService: RoomService) { }
  
  rooms: any[] = [];
  visible: boolean = false;
  
  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (data: any) => {
        this.rooms = data;
      }
    })
  }

  showDialog(room: any) {
    this.visible = !this.visible;
  }

  
  
}
