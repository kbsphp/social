import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray } from '@angular/forms';
import { DataService } from '../../shared/data.service'
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as emoji from 'node-emoji';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css'],
  providers: [DatePipe],
  
})
export class UserFeedComponent implements OnInit {
  user_id;
  post_id;
  base_url: string = "";
  img_url: string = "";
  post_data : any = [];
  new_post_data : any = [];
  cmnt_data : any = [];
  isComment: boolean = false;
  isPostComment:boolean=false;
  comment: string= "";
  comment_error: string = "";
  isDeleteComment: boolean = false;

  constructor(private formBuilder:FormBuilder,
    private data_service: DataService,
    private datePipe: DatePipe
    ) {
    this.base_url = environment.base_url;
    this.img_url = environment.img_url;

   }

  ngOnInit() {
    this.postAllList();
    this.data_service.currentMessage.subscribe
    (message => {
      console.log(this.user_id)
      console.log(message)
      this.new_post_data.unshift(message);
    })
  }

  postAllList(){
    this.user_id = sessionStorage.getItem('user_id');
    this.data_service.postList(this.user_id).subscribe((response) => {
      if(response['error'] == false){
        this.post_data = this.post_data.concat(response['body']);
        this.new_post_data = this.post_data;
       console.log(this.new_post_data);
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
    
    
    comment_box(pvar_id){
      console.log(pvar_id);
      this.post_id = pvar_id;
      if(sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id') != null){
        this.user_id = sessionStorage.getItem('user_id');
      }
      this.isComment = true;
      if(this.isComment == true){
        this.cmnt_data = [];
        this.commentList(pvar_id);
      }
    }

    commentList(post_id){
      this.data_service.commentList(post_id).subscribe((response) => {
        if(response['error'] == false){
          this.cmnt_data = response['body'];
      
          //this.cmnt_data.concat(response['body']);
          //this.new_cmnt_data = this.cmnt_data;
        }else{
          console.log(response['msg']);
        }
      },error =>{
        console.log("Something went wrong! Please try after some time. ")
      });
    }

    //getProfilePic()

    post_comment(){
      if(sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != null &&
      sessionStorage.getItem('user_id') != undefined && sessionStorage.getItem('user_id') != null){
        this.user_id = sessionStorage.getItem('user_id');
        if(this.comment == "" || this.comment.trim() === ''){
          console.log("Please enter comment");
          //this.comment_error="Please enter comment";
          return;
        }
        const input_data = {
          "userID" : this.user_id,
          "post_id": this.post_id,
          "comment": this.comment
        }
        this.isPostComment = true;
        this.data_service.commentOnPost(input_data).subscribe((response) => {
          if(response['error'] == false){
            this.cmnt_data.unshift(response['body']);
            this.comment = "";
            this.isPostComment = false;
          }else{
            this.isPostComment = false;
            this.comment_error=response['msg'];
          }
        },error =>{
          this.isPostComment = false;
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
          this.cmnt_data.splice(this.cmnt_data.indexOf(cmnt), 1);
        }else{
          this.isDeleteComment = false;
         
        }
      },error =>{
        this.isDeleteComment = false;
        console.log('Please check the data and try again!');
      });
    }
 
 
 
  }


 

