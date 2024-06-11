import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  getRooms() : Observable<any> {
    return this.httpClient.get<any>('http://localhost:9003/rooms');
  }
}
