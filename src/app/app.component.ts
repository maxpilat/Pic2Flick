import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('counterBtn') counterButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('galleryBtn') galleryButton!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.setFocus(this.router.url);
    });
  }

  private setFocus(url: string) {
    switch (url) {
      case '/counter':
        return this.counterButton.nativeElement.focus();
      case '/gallery':
        return this.galleryButton.nativeElement.focus();
    }
  }
}
