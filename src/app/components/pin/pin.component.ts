import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Pin } from '../../store/models/pin.model';

@Component({
  selector: 'pin',
  standalone: true,
  imports: [],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss',
})
export class PinComponent {
  @Input() pin!: Pin;
  @Output() private imageLoaded = new EventEmitter<void>();
  @ViewChild('pinElem') private pinRef: ElementRef;

  ngAfterViewInit() {
    this.calcPinWidth();
  }

  private calcPinWidth() {
    const minWidth = 200;
    const maxWidth = 300;
    const margin = 22;

    let numPins = Math.floor(window.innerWidth / (minWidth + margin));
    let pinWidth = window.innerWidth / numPins - margin;
    if (pinWidth > maxWidth) {
      pinWidth = window.innerWidth / ++numPins - margin;
    }

    this.pinRef.nativeElement.style.width = `${pinWidth}px`;
  }

  onImageLoad() {
    this.imageLoaded.emit();
  }
}
