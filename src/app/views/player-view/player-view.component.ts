import {Component, OnInit} from '@angular/core';
import {TrackService} from '../../services/track.service';
import {Observable} from 'rxjs';
import {Track} from '../../models';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  audioList$: Observable<Track[]>;
  playingTrack$: Observable<Track>;
  playingDuration$: Observable<number>;

  constructor(
    private trackService: TrackService
  ) {
  }

  ngOnInit() {
    this.audioList$ = this.trackService.trackList$;
    this.playingTrack$ = this.trackService.playingTrack$;
    this.playingDuration$ = this.trackService.duration$;
  }

  onJump(time: number) {
    this.trackService.jump(time);
  }

  onPlay(track: Track) {
    this.trackService.play(track);
  }
}
