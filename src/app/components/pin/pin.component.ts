import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() imageLoaded = new EventEmitter<void>();

  onImageLoad() {
    this.imageLoaded.emit();
  }
}
