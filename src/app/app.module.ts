import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/common/http';
//import { CommonModule,HashLocationStrategy, LocationStrategy } from '@angular/common';
 import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralFeedComponent } from './components/general-feed/general-feed.component';
import { HeaderComponent } from './components/header/header.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DataService } from './shared/data.service';
import { CookieService } from 'ngx-cookie-service';

import { FriendListComponent } from './components/friend-list/friend-list.component';
<<<<<<< HEAD

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ProfileComponent } from './components/profile/profile.component'
import { DatePipe } from '@angular/common';
=======
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CreatePostComponent } from './components/create-post/create-post.component'
>>>>>>> b6a74e9b8c7e1399d3e6647eeb90898ffbec392e
@NgModule({
  declarations: [
    AppComponent,
    GeneralFeedComponent,
    HeaderComponent,
    UserFeedComponent,
    LoginComponent,
<<<<<<< HEAD

    FriendListComponent,

=======
    FriendListComponent,
>>>>>>> b6a74e9b8c7e1399d3e6647eeb90898ffbec392e
    CreatePostComponent,

    ProfileComponent
    
<<<<<<< HEAD

=======
>>>>>>> b6a74e9b8c7e1399d3e6647eeb90898ffbec392e
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule
  ],
<<<<<<< HEAD

  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},DataService,CookieService],

  providers: [DataService,CookieService,DatePipe],
=======
   entryComponents : [HeaderComponent],
  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},DataService,CookieService],
  providers: [DataService,CookieService],
>>>>>>> b6a74e9b8c7e1399d3e6647eeb90898ffbec392e
  bootstrap: [AppComponent]
})
export class AppModule { }
