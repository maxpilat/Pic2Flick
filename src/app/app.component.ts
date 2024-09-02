import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChildren('tab') tabs: QueryList<ElementRef<HTMLButtonElement>>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.setActiveTab(this.router.url);
    });
  }

  private setActiveTab(url: string) {
    this.tabs.forEach((btn) => btn.nativeElement.classList.remove('active'));
    const tab = this.tabs.find((tab) => tab.nativeElement.parentElement.getAttribute('routerLink') === url);
    tab.nativeElement.classList.add('active');
  }
}
