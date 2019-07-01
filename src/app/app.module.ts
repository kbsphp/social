import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GeneralFeedComponent } from './components/general-feed/general-feed.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GeneralFeedComponent,
    UserFeedComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
