import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-general-feed',
  templateUrl: './general-feed.component.html',
  styleUrls: ['./general-feed.component.css']
})
export class GeneralFeedComponent implements OnInit {
  user_id;
  post_data : any = [];
  constructor(
    private data_service: DataService
  ) { }

  ngOnInit() {
    this.generalPostAllList();
  }


  generalPostAllList(){
    this.user_id = sessionStorage.getItem('user_id');
    this.data_service.generalPostData(this.user_id).subscribe((response) => {
      console.log(response);
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


}
