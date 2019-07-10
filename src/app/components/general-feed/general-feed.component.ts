import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { DatePipe } from '@angular/common';
import * as emoji from 'node-emoji';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-general-feed',
  templateUrl: './general-feed.component.html',
  styleUrls: ['./general-feed.component.css'],
  providers: [DatePipe],
})
export class GeneralFeedComponent implements OnInit {
  user_id;
//  postcomment;
  post_data : any = [];
  base_url: string = "";
  img_url: string = "";
  cmnt_data: any= [];
  profile_picture;
  isDeleteComment:boolean=false;
  constructor(
    private data_service: DataService,
    private datePipe: DatePipe
  ) {
    this.base_url = environment.base_url;
    this.img_url = environment.img_url;
     let user = JSON.parse(localStorage.getItem('userData'));
    this.profile_picture = user.profile_picture;
   }

  ngOnInit() {
    this.generalPostAllList();
    this.data_service.currentMessage.subscribe
    (message => {
      this.post_data.unshift(message);
    })
  }


  generalPostAllList(){
    this.user_id = sessionStorage.getItem('user_id');
    this.data_service.generalPostData(this.user_id).subscribe((response) => {
      if(response['error'] == false){
        this.post_data = response['body'];
       console.log(this.post_data);
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
  
  
  like(pvar_obj,pvar_status){
    if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null &&
    sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id') != null){
      
     this.user_id = sessionStorage.getItem('user_id');
       this.data_service.likeOnPost(pvar_obj['id'],this.user_id).subscribe((response) => {
        if(response['error'] == false){
          pvar_obj['is_likes'] = response['body'][0]['is_likes'];
          pvar_obj['likes'] = response['body'][0]['likes'];
          return pvar_obj;
        }else{
          console.log(response['msg']);
        }
      },error =>{
        console.log("Something went wrong! Please try after some time");
      });
    }
  }

  // commentList(post_id){
  //   this.data_service.commentList(post_id).subscribe(response => {
  //     console.log(response);
  //     if(response['error'] == false){
  //       this.cmnt_data = response['body'];
  //  // console.log(this.cmnt_data);
  //     }else{
  //       console.log(response['msg']);
  //     }
  //   },error =>{
  //     console.log("Something went wrong! Please try after some time. ")
  //   });
  // }


  post_comment(postID,pvarCommnet){
    if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null &&
    sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id') != null){
      this.user_id = sessionStorage.getItem('user_id');
      if(pvarCommnet == "" || pvarCommnet.trim() === ''){
        console.log("Please enter comment");
        //this.comment_error="Please enter comment";
        return;
      }
      
      const input_data = {
        "userID" : this.user_id,
        "post_id": postID,
        "comment": pvarCommnet
      }
      console.log(input_data);
      this.data_service.commentOnPost(input_data).subscribe((response) => {
        if(response['error'] == false){
          this.post_data[0]['comments'].push(response['body']);
          pvarCommnet ="";
        //  console.log(pvarCommnet);
          
        }else{
          console.log(response['msg']);
        }
      },error =>{
        console.log("Something went wrong");
      });
    }
  }


  delete_comment(cmnt){
    let p_user_id = cmnt.user_id;
    let p_cmnt_id = cmnt.id;
    let p_post_id = cmnt.post_id;
    this.isDeleteComment = true;
    this.data_service.deleteComment(p_user_id,p_cmnt_id,p_post_id).subscribe((response) => {
      if(response['error'] == false){
        this.isDeleteComment = false;
        this.post_data[0]['comments'].splice(this.post_data[0]['comments'].indexOf(cmnt), 1);
      }else{
        this.isDeleteComment = false;
       
      }
    },error =>{
      this.isDeleteComment = false;
      console.log('Please check the data and try again!');
    });
  }



}
