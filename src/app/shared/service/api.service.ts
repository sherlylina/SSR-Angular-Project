import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError,  BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

/* json */
import * as id from '../../../assets/json/id.json';
import * as en from '../../../assets/json/en.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = environment.API_URL+'/api/';
  lang = new BehaviorSubject<string>('en');
  // Setting request headers to JSON
  headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) {}
  
  getDataApi(param:string): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + param + '?lang=' + this.lang.value,{
        headers: this.headers,
        responseType: 'json'
      }).pipe(catchError(this.errorGetHandler.bind(this)));
  }

  getNextPage(param:string): Observable<any> {
    return this.httpClient.get<any>(param, {
        headers: this.headers,
        responseType: 'json'
      }).pipe(catchError(this.errorHandler));
  }

  postDataApi(param:string, body:any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + param, (body)).pipe(catchError(this.errorHandler));
  }

  isLang() {
    return this.lang.value == 'id' ? (id as any).default : (en as any).default;
  }
  
  errorGetHandler(error: HttpErrorResponse) {
    this.router.navigate(['/not-found']);
    return throwError(error.message || 'Data Not Found');
  } 

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Data Not Found');
  }
  
}
