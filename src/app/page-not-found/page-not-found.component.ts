import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { ColorSchemeService } from '../color-scheme.service';



@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(public colorScheme: ColorSchemeService, private meta: Meta) { }

  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }

}
