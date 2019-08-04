import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, Observable} from 'rxjs';
import {PlayMode, Track} from '../models';
import {map} from 'rxjs/operators';
import {shuffle} from 'lodash-es';

const audios: Track[] = [
  {
    id: 1,
    name: 'Jazz Mango',
    filename: 'Jazz_Mango.mp3',
    duration: 132
  },
  {
    id: 2,
    name: 'Song of Mirrors',
    filename: 'Song_of_Mirrors.mp3',
    duration: 378
  },
  {
    id: 3,
    name: 'The Long Night',
    filename: 'The_Long_Night.mp3',
    duration: 169
  }
];

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private playList: Track[];
  private audio = new Audio();
  private readonly originalPlaylist: Track[];

  duration$: Observable<number>;

  private _playMode$ = new BehaviorSubject<PlayMode>(PlayMode.noRepeat);
  playMode$: Observable<PlayMode> = this._playMode$.asObservable();

  private _isShuffle$ = new BehaviorSubject<boolean>(false);
  isShuffle$: Observable<boolean> = this._isShuffle$.asObservable();

  private _isPlaying$ = new BehaviorSubject<boolean>(false);
  isPlaying$: Observable<boolean> = this._isPlaying$.asObservable();

  private _trackList$ = new BehaviorSubject<Track[]>(audios);
  trackList$: Observable<Track[]> = this._trackList$.asObservable();

  private _currentTrack$: BehaviorSubject<Track>;
  currentTrack$: Observable<Track>;

  constructor() {
    this._currentTrack$ = new BehaviorSubject<Track>(audios[0]);
    this.currentTrack$ = this._currentTrack$.asObservable();
    this.originalPlaylist = audios;

    this.duration$ = fromEvent(this.audio, 'timeupdate').pipe(
      map(() => this.audio.currentTime)
    );
    fromEvent(this.audio, 'ended').subscribe(() => this.nextTrack());
    combineLatest(this._playMode$, this._isShuffle$).subscribe(
      ([mode, isShuffle]) => {
        const playList = this.getPlayListBySettings(mode, isShuffle);
        this.changePlayList(playList);
      }
    );
  }


  private changePlayList(tracks: Track[]) {
    this.playList = tracks;
    if (!this._isPlaying$.value) {
      this.switchTrack(tracks[0]);
    }
  }

  private getPlayListBySettings(mode: PlayMode, isShuffle: boolean): Track[] {
    if (mode === PlayMode.repeatTrack) {
      return [this._currentTrack$.value];
    }
    return isShuffle ? shuffle(this.originalPlaylist) : [...this.originalPlaylist];
  }

  private switchTrack(track: Track) {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = `assets/audios/${track.filename}`;
    this._currentTrack$.next(track);
  }


  private playAudio() {
    this.audio.play();
    this._isPlaying$.next(true);
  }

  private pauseAudio() {
    this.audio.pause();
    this._isPlaying$.next(false);
  }

  play(track: Track = null) {
    const trackChanged = track && this._currentTrack$.value !== track;
    if (trackChanged) {
      this.switchTrack(track);
    }
    if (!this._isPlaying$.value || trackChanged) {
      this.playAudio();
    }
  }

  nextTrack() {
    const nextIndex = this.playList.indexOf(this._currentTrack$.value) + 1;
    const nextTrack = this.playList[nextIndex % this.playList.length];
    const mode = this._playMode$.value;
    this.switchTrack(nextTrack);
    const shouldPlay = this._isPlaying$.value && (
      (mode === PlayMode.noRepeat && nextIndex < this.playList.length) ||
      (mode !== PlayMode.noRepeat)
    );
    if (shouldPlay) {
      this.playAudio();
    } else {
      this.pauseAudio();
    }
  }

  prevTrack() {
    if (this._isPlaying$.value && this.audio.currentTime > 5) {
      this.audio.currentTime = 0;
      return;
    }
    const prevIndex = this.playList.indexOf(this._currentTrack$.value) - 1;
    this.switchTrack(this.playList[prevIndex > 0 ? prevIndex : 0]);
    const shouldPlay = this._isPlaying$.value && prevIndex >= 0;
    if (shouldPlay) {
      this.playAudio();
    }
  }

  pause() {
    if (this._isPlaying$.value) {
      this.pauseAudio();
    }
  }

  jump(value: number) {
    this.audio.currentTime = value;
  }

  nextMode() {
    const modeSize = Object.keys(PlayMode).length / 2;
    const mode = (this._playMode$.value + 1) % modeSize;
    this._playMode$.next(mode);
  }

  toggleShuffle() {
    this._isShuffle$.next(!this._isShuffle$.value);
  }
}
