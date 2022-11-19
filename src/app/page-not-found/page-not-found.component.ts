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
  public redirect = false;

  constructor(public colorScheme: ColorSchemeService, private meta: Meta, private router: Router) { }

  /**
   * mark page as none indexable
   */
  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
    const url = this.router.url;
    if (url.includes('frc')) {
      this.prepareRedirect('/programs/frc');
    } else if (url.includes('ftc')) {
      this.prepareRedirect('/programs/ftc');
    } else if (url.includes('fll')) {
      if (url.includes('explore')) {
        this.prepareRedirect('/programs/fll/explore');
      } else {
        this.prepareRedirect('/programs/fll/challenge');
      }
    } else if (url.includes('minecraft')) {
      this.prepareRedirect('/programs/minecraft');
    }
  }
  prepareRedirect(url: string): void {
    this.url = url;
    this.redirect = true;
    this.countdownRedirect();
  }
  countdownRedirect() {
    if (!this.redirect) return;
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
