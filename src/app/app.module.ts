import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralFeedComponent } from './components/general-feed/general-feed.component';
import { HeaderComponent } from './components/header/header.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralFeedComponent,
    HeaderComponent,
    UserFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
