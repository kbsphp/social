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
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CreatePostComponent } from './components/create-post/create-post.component'
@NgModule({
  declarations: [
    AppComponent,
    GeneralFeedComponent,
    HeaderComponent,
    UserFeedComponent,
    LoginComponent,
    CreatePostComponent,
    
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
  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},DataService,CookieService],
  providers: [DataService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
