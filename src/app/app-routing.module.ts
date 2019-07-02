import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralFeedComponent } from './components/general-feed/general-feed.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';


const routes: Routes = [
  {path:'',component:GeneralFeedComponent},
  {path:'profile',component:UserFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
