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
<<<<<<< HEAD
import { FriendListComponent } from './components/friend-list/friend-list.component';
=======
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CreatePostComponent } from './components/create-post/create-post.component'
>>>>>>> e32a8c06059035ac1fdc9d46323f86ce05b44317
@NgModule({
  declarations: [
    AppComponent,
    GeneralFeedComponent,
    HeaderComponent,
    UserFeedComponent,
    LoginComponent,
<<<<<<< HEAD
    FriendListComponent
=======
    CreatePostComponent,
    
>>>>>>> e32a8c06059035ac1fdc9d46323f86ce05b44317
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
   entryComponents : [HeaderComponent],
=======
  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},DataService,CookieService],
>>>>>>> e32a8c06059035ac1fdc9d46323f86ce05b44317
  providers: [DataService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
