import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
<<<<<<< HEAD
  private loggedIn = new BehaviorSubject<boolean>(false); 
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private _http: HttpClient,private http : Http) { }
=======
  constructor(private _http: HttpClient,private http : Http) { 
    this.base_url = environment.base_url;
  }
  
  public messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  newPostMessageUpdation(message) {
    this.messageSource.next(message);
  }
>>>>>>> e32a8c06059035ac1fdc9d46323f86ce05b44317

   login(input_data){
    return this.http.post(this.base_url+'login',input_data)
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
<<<<<<< HEAD
  
=======

  
  userFeedPost(formData,token) {
    const httpOptions = { 
      headers: new HttpHeaders({'authorization':token })
    };
   return this._http.post(this.base_url+'uploadPost', formData, httpOptions);
  }

  postList(pvarId){
    return this._http.get(this.base_url+'postList/'+pvarId)
    .map((response:Response)=>{const data = response;return data;})
    .catch((error:Error) => {return Observable.throw(error);});
  }

  likeOnPost(post_id,pvar_user_id){
    if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null){
      this.token = sessionStorage.getItem('token');
    }
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': this.token })};
    return this._http.get(this.base_url+'likeOnPost/'+pvar_user_id+"/"+post_id, httpOptions )
    .map((response:Response)=>{const data = response;return data;})
    .catch((error:Error) => {return Observable.throw(error);});
  }

  commentList(post_id){
    return this._http.get(this.base_url+'commentList/'+post_id)
    .map((response:Response)=>{const data = response;return data;})
    .catch((error:Error) => {return Observable.throw(error);});
  }

  commentOnPost(input_data){
    if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null){this.token = sessionStorage.getItem('token');}
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': this.token })};
    return this._http.post(this.base_url+'commentOnPost', input_data, httpOptions)
    .map((response:Response)=>{const data = response;return data;})
    .catch((error:Error) => {return Observable.throw(error);});
  }

  deleteComment(user_id,cmnt_id,post_id){
    if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null){this.token = sessionStorage.getItem('token');}
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': this.token })};
    return this._http.get(this.base_url+'deleteComment/'+user_id+"/"+cmnt_id+"/"+post_id, httpOptions )
    .map((response:Response)=>{const data = response;return data;})
    .catch((error:Error) => {return Observable.throw(error);});
  }


>>>>>>> e32a8c06059035ac1fdc9d46323f86ce05b44317
}
