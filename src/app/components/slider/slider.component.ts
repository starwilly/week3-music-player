import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements OnInit, ControlValueAccessor {

  // private percent = 0.3;
  private sliderDimension: ClientRect | null = null;
  private isSliding = false;
  @Input() min = 0;
  @Input() max = 100;
  private _value = 0;

  @Input()
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  @ViewChild('sliderWrapper', {static: true}) private slider: ElementRef;


  constructor() {
  }

  ngOnInit() {
  }

  onMouseEnter(event) {
    this.sliderDimension = this.getSliderDimension();
  }

  private getSliderDimension(): ClientRect {
    return this.slider ? (this.slider.nativeElement as HTMLElement).getBoundingClientRect() : null;
  }

  get thumbStyles(): { [key: string]: string } {
    const percent = (this.value - this.min) / (this.max - this.min);
    return {
      left: `${percent * 100}%`
    };
  }

  onSlide(event) {
    const {x, y} = event.center;
    this.updateValueByPosition({x, y});
  }

  onSlideStart(event) {
    this.isSliding = true;
  }

  onSlideEnd(event) {
    this.propagateChange(this.value);
    this.isSliding = false;
  }

  onClick(event: MouseEvent) {
    const {clientX: x, clientY: y} = event;
    this.updateValueByPosition({x, y});
    this.propagateChange(this.value);
  }

  private updateValueByPosition(pos: { x: number, y: number }) {
    const {left, width } = this.sliderDimension;
    const x = Math.max(left, Math.min(pos.x, left + width));
    this.value = (x - left) / width * (this.max - this.min) + this.min;
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: number): void {
    if (value !== undefined && !this.isSliding) {
      this.value = value;
    }
  }
}
