import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerViewComponent } from './views/player-view/player-view.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumDetailComponent } from './components/albumn-detail/album-detail.component';
import { PlayerComponent } from './components/player/player.component';
import { SliderComponent } from './components/slider/slider.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayerViewComponent,
    AlbumListComponent,
    AlbumDetailComponent,
    PlayerComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
