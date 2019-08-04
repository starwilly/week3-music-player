import {Component, OnInit} from '@angular/core';
import {TrackService} from '../../services/track.service';
import {Observable} from 'rxjs';
import {PlayMode, Track} from '../../models';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  audioList$: Observable<Track[]>;
  currentTrack$: Observable<Track>;
  playingDuration$: Observable<number>;
  mode$: Observable<PlayMode>;
  isShuffle$: Observable<boolean>;
  isPlaying$: Observable<boolean>;

  constructor(
    private trackService: TrackService
  ) {
  }

  ngOnInit() {
    this.audioList$ = this.trackService.trackList$;
    this.currentTrack$ = this.trackService.currentTrack$;
    this.playingDuration$ = this.trackService.duration$;
    this.mode$ = this.trackService.playMode$;
    this.isShuffle$ = this.trackService.isShuffle$;
    this.isPlaying$ = this.trackService.isPlaying$;
  }

  onJump(time: number) {
    this.trackService.jump(time);
  }

  onPlayTrack(track: Track) {
    this.trackService.play(track);
  }

  onPlayClick() {
    this.trackService.play(null);
  }

  onPauseClick() {
    this.trackService.pause();
  }

  onNextClick() {
    this.trackService.nextTrack();
  }

  onPrevClick() {
    this.trackService.prevTrack();
  }

  onModeChange() {
    this.trackService.nextMode();
  }

  onToggleShuffle() {
    this.trackService.toggleShuffle();
  }
}
