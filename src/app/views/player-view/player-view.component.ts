import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  value = 15;

  onChange(value) {
    console.log('value change', value);
  }
}
