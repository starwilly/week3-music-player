import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, ReplaySubject} from 'rxjs';
import {Track} from '../models';
import {map} from 'rxjs/operators';

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

  private _trackList = new BehaviorSubject<Track[]>(audios);
  private _playingTrack = new ReplaySubject<Track>(1);
  private playingTrack: Track;
  private audio = new Audio();

  duration$: Observable<number>;

  constructor() {
    this.trackList$ = this._trackList.asObservable();
    this.playingTrack$ = this._playingTrack.asObservable();
    this.duration$ = fromEvent(this.audio, 'timeupdate').pipe(
      map(() => this.audio.currentTime)
    );
  }

  trackList$: Observable<Track[]>;
  playingTrack$: Observable<Track>;

  play(track: Track) {
    if (!this.playingTrack || this.playingTrack.id !== track.id) {
      this.playingTrack = track;
      this._playingTrack.next(track);
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = `assets/audios/${track.filename}`;
    }
    this.audio.play();
  }

  pause() {
    if (this.playingTrack) {
      this.audio.pause();
    }
  }

  jump(value: number) {
    this.audio.currentTime = value;
  }
}
