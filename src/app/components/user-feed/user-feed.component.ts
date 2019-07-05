import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
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
  @ViewChild('file') fileupload: ElementRef;
  user_id;
  post_id;
  userData;
  profile_picture;
  file:File;
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
    this.userData=JSON.parse(localStorage.getItem('userData'));
    this.profile_picture = this.img_url + "" + this.userData['profile_picture'];
    this.data_service.detectChange().subscribe(()=>{
      if(localStorage.getItem("updated_pic") != undefined){
      this.profile_picture = localStorage.getItem("updated_pic") ;
      }
    })
   }

  ngOnInit() {
    if(localStorage.getItem("updated_pic") != undefined){
      this.profile_picture = localStorage.getItem("updated_pic") ;
      }
    this.postAllList();
    this.data_service.currentMessage.subscribe
    (message => {

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
      console.log(this.cmnt_data);
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
            console.log(response);
            this.cmnt_data.push(response['body']);
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

    coverPhoto(file){
      this.file = file.target.files[0];
      console.log(this.file);
      if(this.file != undefined && this.file != null){
      var strFileName = this.getFileExtension1(this.file.name);
      if(strFileName != 'jpeg' && strFileName != 'png' && strFileName != 'jpg'){
      console.log('Please select valid profile image.');
      return;
      }
      }else{
      console.log('Please select profile pic ');
      return;
      }

      var input_data = {
        "userID": parseInt(this.user_id),
        "cover_pic": this.file == undefined ? "" : this.file
        }
        console.log(input_data);
        const formData = new FormData();
        formData.append('userID', this.user_id);
        formData.append('cover_pic', input_data.cover_pic);

        this.data_service.updateUserCoverPhoto(formData).subscribe((response) => {
          console.log(response);
          // if(response['error'] == false){
          // this.profile_picture = this.img_url + "" + response['body'][0].profile_picture;
          // console.log(this.profile_picture);
          // localStorage.setItem('updated_pic',this.profile_picture);
          // this.data_service.changeSub.next('change');
          // this.fileupload.nativeElement.value="";
          // console.log("Profile changed.");
          // }else{
          // console.log(response['msg']);
          // }
          },error =>{
            console.log(error);
          });

    }


    fileChange(file) {
      this.file = file.target.files[0];
      if(this.file != undefined && this.file != null){
      var strFileName = this.getFileExtension1(this.file.name);
      if(strFileName != 'jpeg' && strFileName != 'png' && strFileName != 'jpg'){
      console.log('Please select valid profile image.');
      return;
      }
      }else{
      console.log('Please select profile pic ');
      return;
      }
      var input_data = {
      "userID": parseInt(this.user_id),
      "profilePic": this.file == undefined ? "" : this.file
      }
      console.log(input_data);
      const formData = new FormData();
      formData.append('userID', this.user_id);
      formData.append('profilePic', input_data.profilePic);
      this.data_service.uploadUserProfilePic(formData).subscribe((response) => {
        console.log(response);
        if(response['error'] == false){
        this.profile_picture = this.img_url + "" + response['body'][0].profile_picture;
        console.log(this.profile_picture);
        localStorage.setItem('updated_pic',this.profile_picture);
        this.data_service.changeSub.next('change');
        this.fileupload.nativeElement.value="";
        console.log("Profile changed.");
        }else{
        console.log(response['msg']);
        }
        },error =>{
          console.log(error);
        });
      }

      getFileExtension1(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
        }
 
 
 
  }


 

