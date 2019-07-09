import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as CryptoJS from 'crypto-js'; 
import { DataService } from '../../shared/data.service';
import { DatePipe } from '@angular/common';
import * as emoji from 'node-emoji';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:any
  user_id:any
  profile_post_data : any = [];
  img_url: string = "";
  profile_new_post_data : any = [];
  profile_picture:string = ''
  username:string=''
  socket_url: string = "";
   private socket;
   user_data : any = [];
  constructor(private activatedRoute:ActivatedRoute,private data_service: DataService,private datePipe: DatePipe) {
   this.img_url = environment.img_url;
  // console.log(this.id)
 //  this.getUserDetail()
    this.socket_url = environment.socket_url;
    this.socket = io.connect(this.socket_url);
   }

  ngOnInit() {
  	this.id=this.activatedRoute.snapshot.paramMap.get('id')

  	 this.id = CryptoJS.AES.decrypt(this.id, 'gurpreet').toString(CryptoJS.enc.Utf8);
  //	 console.log(this.id)
   this.getUserDetail()
  this.getFriendList()
  if(sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id') != null){
      this.user_id = sessionStorage.getItem('user_id');
    }
  //console.log(this.user_id+'...................'+ this.id)
// this.getUserDetail();
  }

  
  getUserDetail() {
  //console.log(this.id)
  //this.data_service.friendDetail(this.id).subscribe(response => {
  	//console.log(response)
  //})
    // console.log(this.id)
        this.data_service.postList(this.id).subscribe((response) => {
      if(response['error'] == false){
        this.profile_post_data = this.profile_post_data.concat(response['body']);
        this.profile_new_post_data = this.profile_post_data;
        //console.log(this.profile_post_data[0].username)
        this.username=this.profile_post_data[0].username
        this.profile_picture=this.profile_new_post_data[0].profile_picture
       console.log(this.profile_new_post_data);
      }else{
       console.log(response['msg']);
      }
    },error =>{
      console.log(error);
    });

  }
  

   toLocalDate(date){
    if(date != null){
      //var d= new Date(this.rectifyFormat(date));
      var d= new Date(date);
      var a = this.datePipe.transform(new Date(d),'dd/MM/yyyy hh:mm a');
      return a;
    }
  }

    convetToEmoji(data){
      let convertData = emoji.emojify(data);
      // console.log(a)
      return convertData;
    }  

    getFriendList(){
    this.socket.on('updateUsers',(response) => {
      this.socket.emit('UserDetail', this.id);
      this.socket.on('GetUser',(users) => { //this.user_data = users;console.log(this.user_data);
      	console.log(users)
      	users.map(item => {
         this.user_data=[ {
          name:item.name,
          id:CryptoJS.AES.encrypt(JSON.stringify(item.id), 'gurpreet').toString(),
          profile_picture:item.profile_picture,
          room:item.room
        }
        ]
      })
      });
    });
  }


}
