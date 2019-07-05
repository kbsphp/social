import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class DataService {
headers : any;
  token : any;
  user_id: any = -1;
  base_url: string = "";
  private loggedIn = new BehaviorSubject<boolean>(false); 
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private _http: HttpClient,private http : Http) { }

   login(input_data){
    return this.http.post('http://35.177.79.248:3021/login',input_data)
    .map((response:Response)=>{const data = response.json();return data;})
    .catch((error:Error) => {return Observable.throw(error);});
  }

   logOut(){
    if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null){this.token = sessionStorage.getItem('token');}
    if(sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id') != null){this.user_id = sessionStorage.getItem('user_id');}
    const input_data = {'userID': this.user_id }
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': this.token })};
    return this._http.post('http://35.177.79.248:3021/logOut', input_data, httpOptions )
    .map((response:Response)=>{const data = response;return data;})
    .catch((error:Error) => {console.log(error);return Observable.throw(error);});
  }
  
}
