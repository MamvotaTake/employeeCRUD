import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:3000/persons/", data)
    .pipe(map((response: any) =>{
      return response;
    }))
  }

  getEmployee() {
    return this.http.get<any>("http://localhost:3000/persons/")
    .pipe(map((response: any) =>{
      return response;
    }))
  }

  deleteEmployee(emplooyeeId: number) {
    return this.http.delete<any>("http://localhost:3000/persons/"+emplooyeeId)
    .pipe(map((response: any) =>{
      return response;
    }))
  }

  updateEmployee(data: any, emplooyeeId: number) {
    return this.http.put<any>("http://localhost:3000/persons/"+emplooyeeId, data)
    .pipe(map((response: any) =>{
      return response;
    }))
  }
}
