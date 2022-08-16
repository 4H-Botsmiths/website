import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { ImageSync } from '../image-fetcher.service';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit, OnDestroy {

  /** The Images To Display*/
  @Input() images!: ImageSync[];

  private interval?: NodeJS.Timer;

  public carouselName = 'imageCarousel' + Math.round(Math.random() * 10);

  constructor(public colorScheme: ColorSchemeService, private router: Router) {
  }


  ngOnInit(): void {
    this.interval = setInterval(() => {
      console.log('rotating');
      document.getElementById('nextButton')?.click();
    }, 1500);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
