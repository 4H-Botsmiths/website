import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';



@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  public countdown = 4;
  public url?: string;
  public urls: string[] = [];
  constructor(public colorScheme: ColorSchemeService, private meta: Meta, private router: Router) { }

  /**
   * mark page as none indexable
   */
  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
    const url = this.router.url;
    if (url.includes('frc')) {
      this.urls.push('/programs/frc');
    } if (url.includes('ftc')) {
      this.urls.push('/programs/ftc');
    } if (url.includes('fll')) {
      if (url.includes('explore')) {
        this.urls.push('/programs/fll/explore');
        this.urls.push('/programs/fll/challenge');
      } else {
        this.urls.push('/programs/fll/challenge');
        this.urls.push('/programs/fll/explore');
      }
    } if (url.includes('minecraft')) {
      this.urls.push('/programs/minecraft');
    }
    if (this.urls.length) {
      this.url = this.urls[0];
      this.countdownRedirect();
    }
  }
  countdownRedirect() {
    if (!this.url) return;
    this.countdown!--;
    setTimeout(() => {
      if (this.countdown <= 0) {
        this.router.navigate([this.url!]);
      } else {
        this.countdownRedirect();
      }
    }, 1000);
  }
  /**
   * remove non-indexable tag
   */
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }

}
