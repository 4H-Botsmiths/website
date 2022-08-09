import { filter, map, mergeMap } from 'rxjs';

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { ColorSchemeService } from './color-scheme.service';
import { MetaService } from './meta.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute!: string;
  loading: boolean = false;
  progress = 0;
  constructor(public colorScheme: ColorSchemeService, public router: Router, private metaService: MetaService, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)).subscribe((data) => {
          console.log(data);
          metaService.updateTitle(data['title'] ?? '');
          metaService.updateDescription(data['description'] ?? '');
          metaService.updateKeywords(data['keywords'] ?? []);
          /*this.metaService.updateMetaTags({
            description: data['description'],
            keywords: data['keywords'],
          })*/
          //this.titleService.setTitle(event['title'] + ' | Site name');
        });
    this.progress = 0;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.closeDropdown();
        this.loading = true;
        this.progress = 100;
        // Show progress spinner or progress bar
        //document.getElementById('loadingBar')!.style.display = 'block';
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        //document.getElementById('loadingBar')!.style.display = 'none';
        setTimeout(() => { this.loading = false; this.progress = 0; }, 500);
        this.currentRoute = event.url;
        console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar
        //document.getElementById('loadingBar')!.style.display = 'none';
        //setTimeout(() => this.loading = false, 500);
        this.loading = false; this.progress = 0;
        // Present error to user
        console.log(event.error);
      }
    });

  }
  title = '4-H Botsmiths';
  routerLinkActive(link: string): boolean {
    return this.router.isActive(link, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' });
  }
  closeDropdown() {
    const nestedDropdown = document.getElementById('navbarDropdownMenuFLLLink');
    nestedDropdown?.classList.contains('show') ? nestedDropdown?.click() : undefined;
    const dropdown = document.getElementById('navbarDropdownMenuLink');
    dropdown?.classList.contains('show') ? dropdown?.click() : undefined;
  }

  public map = ``;
}