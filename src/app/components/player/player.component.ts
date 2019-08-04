import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayMode} from '../../models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() isShuffle: boolean;
  @Input() isPlaying: boolean;
  @Input() mode: PlayMode;
  @Input() duration: number;
  @Input() currentTime: number;

  @Output() modeChange = new EventEmitter<void>();
  @Output() toggleShuffle = new EventEmitter<void>();
  @Output() playClick = new EventEmitter<void>();
  @Output() pauseClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
  @Output() prevClick = new EventEmitter<void>();
  @Output() jump = new EventEmitter<number>();

  PlayMode = PlayMode;

  constructor() {
  }

  ngOnInit() {
  }
}
