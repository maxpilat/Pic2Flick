import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Pin } from '../../services/pin.service';

@Component({
  selector: 'pin',
  standalone: true,
  imports: [],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss',
})
export class PinComponent implements AfterViewInit {
  @Input() pin!: Pin;
  @Output() private imageLoaded = new EventEmitter<void>();
  @ViewChild('pinElem') private pinRef!: ElementRef;

  constructor(private router: Router) {}

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

  handleClick() {
    this.router.navigate(['/movie-collection'], {
      queryParams: { pinUrl: this.pin.url }
    });
  }
}
