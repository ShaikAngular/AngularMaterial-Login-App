import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  postDetails(username, password){
    return this.http.post('/Login-Details',{username, password}).pipe(
      tap(response=>console.log('response-->', response))
    )
  }
}
