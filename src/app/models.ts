export interface Track {
  id: number;
  name: string;
  filename: string;
  duration: number;
}

export enum PlayMode {
  repeatTrack,
  repeatPlayList,
  noRepeat
}
