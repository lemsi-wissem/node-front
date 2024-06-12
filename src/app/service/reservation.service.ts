import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  constructor(private httpClient: HttpClient) { }


  reserveRoom(room: any) : Observable<any> {
    return this.httpClient.post<any>('http://localhost:9003/reservation', room);
  }

  getMyReservations() : Observable<any> { 
    return this.httpClient.get<any>('http://localhost:9003/reservations/me');
  }
  getReservations() : Observable<any> {
    return this.httpClient.get<any>('http://localhost:9003/reservations');
  }
}
