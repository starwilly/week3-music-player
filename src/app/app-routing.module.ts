import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerViewComponent} from './views/player-view/player-view.component';


const routes: Routes = [
  {path: '**', component: PlayerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
