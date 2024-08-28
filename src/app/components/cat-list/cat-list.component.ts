import { Component, OnInit } from '@angular/core';
import { Cat } from '../../store/models/cat.model';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from '../cat-card/cat-card.component';
import { CatsState } from '../../store/reducers/cats.reducer';
import { Store } from '@ngrx/store';
import { loadCats } from '../../store/actions/cats.actions';
import { Observable } from 'rxjs';
import { selectCats } from '../../store/selectors/cats.selectors';

@Component({
  selector: 'cat-list',
  standalone: true,
  imports: [CommonModule, CatCardComponent],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
})
export class CatListComponent implements OnInit {
  cats$: Observable<Cat[]>;

  constructor(private store: Store<CatsState>) {
    this.cats$ = this.store.select(selectCats);
  }

  ngOnInit() {
    this.store.dispatch(loadCats());
  }
}
