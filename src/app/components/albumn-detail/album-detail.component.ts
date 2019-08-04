import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-albumn-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  @Input() isPlaying: boolean;

  @Output() playClick = new EventEmitter<void>();
  @Output() pauseClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
