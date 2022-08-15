import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { ImageSync } from '../image-fetcher.service';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  /** The Images To Display*/
  @Input() images!: ImageSync[];

  public carouselName = 'imageCarousel' + Math.round(Math.random() * 10);

  constructor(public colorScheme: ColorSchemeService, private router: Router) {
  }

  ngOnInit(): void {
    //document.getElementById('nextButton')!.click()
    //document.onload = () => document.getElementById('nextButton')!.click()
    //setTimeout(() => document.getElementById('nextButton')!.click(), 1000);
    //const myCarousel = document.querySelector('#' + this.carouselName);
    //const carousel: Carousel = new window.bootstrap.Carousel(myCarousel!)
    //setTimeout(() => document.getElementById('nextButton')!.dispatchEvent(new Event('click')), 1000);
    //document.getElementById('nextButton')!.dispatchEvent(new Event('click'))
    /*setTimeout(() => {
      console.log('rotating')
      //carousel.next()
      document.getElementById(this.carouselName + 'nextButton')!.click()
    }, 5000);*/
    const interval = setInterval(() => {
      console.log('rotating');
      document.getElementById('nextButton')?.click();
      //$("#nextButton").trigger('click');
    }, 1500);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        clearInterval(interval);
        // Show progress spinner or progress bar
      }
    });
  }
}
