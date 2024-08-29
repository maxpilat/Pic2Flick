import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cat } from '../../store/models/cat.model';

@Component({
  selector: 'cat-card',
  standalone: true,
  imports: [],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss',
})
export class CatCardComponent {
  @Input() cat!: Cat;
  @Output() imageLoaded = new EventEmitter<void>();

  onImageLoad() {
    this.imageLoaded.emit();
  }
}
