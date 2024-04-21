import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }


  getCustomer(): Observable<any[]> {
    // Update the URL to fetch data from http://localhost:8080/customer
    return this.http.get<any[]>('http://localhost:8080/customer');
  }

  getcustomer(custId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/customer/${custId}`);
  }

  deletecustomer(custId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/customer/del/${custId}`);
  }

  updatecustomer(custId: number, customerData: any): Observable<any> {
    // Make a PUT request to update a customer
    return this.http.put<any>(`http://localhost:8080/customer/update/${custId}`, customerData);
  }

  addcustomer(customerData: any): Observable<any> {
    // Make a POST request to add a customer
    return this.http.post<any>('http://localhost:8080/customer/add', customerData);
  }







  getCoach(): Observable<any[]> {
    // Update the URL to fetch data from http://localhost:8080/coach
    return this.http.get<any[]>('http://localhost:8080/coach');
  }

  getcoach(coachId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/coach/${coachId}`);
  }

  deletecoach(coachId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/coach/del/${coachId}`);
  }

  updatecoach(Id: number, coachData: any): Observable<any> {
    // Make a PUT request to update a coach
    return this.http.put<any>(`http://localhost:8080/coach/update/${Id}`, coachData);
  }

  addcoach(coachData: any): Observable<any> {
    // Make a POST request to add a coach
    return this.http.post<any>('http://localhost:8080/coach/add', coachData);
  }




}


