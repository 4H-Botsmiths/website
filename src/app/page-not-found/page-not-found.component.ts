import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { routes as Routes } from '../app-routing.module';
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
    const findRoutes = (path: string, routes?: typeof Routes) => {
      for (const route of routes ?? Routes) {
        if (route.path) {
          if (route.children) {
            findRoutes(`${path}/${route.path}`, route.children);
            if (url.includes(route.path)) {
              for (const child of route.children) {
                if (child.path && !this.urls.find(url => url.endsWith(child.path!))) {
                  this.urls.push(`${path}/${route.path}/${child.path}`);
                }
              }
            }
          } else if (url.includes(route.path) && route.redirectTo === undefined) {
            this.urls.push(`${path}/${route.path}`);
          }
        }
      }
    };
    findRoutes('');
    if (this.urls.length) {
      this.url = this.urls.shift();
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
