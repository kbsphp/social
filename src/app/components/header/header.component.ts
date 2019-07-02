import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
//import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user_id : any = -1;
  userData : any
  names:any
  newarray: any[];
  str: string;

   
  constructor( private data_services: DataService,   
   
    private router: Router,
    ) { }

  ngOnInit() {
  }
  logout(){
    console.log(this.user_id)
    if(this.user_id != -1){
      this.data_services.logOut().subscribe(response =>{
        if(response['error'] == false){
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user_id');
          localStorage.removeItem('isLoggedin');
          localStorage.removeItem('userData');
          this.router.navigate(['/']);
        }else{
         // this.toastr.errorToastr(response['msg']);
        }
      },error => {})
    }else{
      localStorage.removeItem('isLoggedin');
      this.router.navigate(['/']);
    }
  }
}
