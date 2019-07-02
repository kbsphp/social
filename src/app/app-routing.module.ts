import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralFeedComponent } from './components/general-feed/general-feed.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'profile',component:UserFeedComponent},
  //{path:''}
  {path:'home',component:GeneralFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
