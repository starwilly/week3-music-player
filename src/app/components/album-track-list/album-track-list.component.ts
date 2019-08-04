import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Track} from '../../models';

@Component({
  selector: 'app-album-track-list',
  templateUrl: './album-track-list.component.html',
  styleUrls: ['./album-track-list.component.scss']
})
export class AlbumTrackListComponent implements OnInit {


  @Input() tracks: Track[];
  @Input() currentTrack: Track;
  @Input() isPlaying: boolean;

  @Output() playTrack = new EventEmitter<Track>();

  constructor() {
  }

  ngOnInit() {
  }

  onPlay(track: Track) {
    this.playTrack.emit(track);
  }
}
