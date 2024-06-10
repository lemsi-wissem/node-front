import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: any) : Observable<any> {
    return this.httpClient.post('http://localhost:9003/auth/login', credentials);
  }

  register(user: any) : Observable<any> {
    return this.httpClient.post('http://localhost:9003/auth/register', user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  validateToken(token: string | null) : Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.httpClient.get('http://localhost:9003/auth/validate', { headers: headers });
  }

}
