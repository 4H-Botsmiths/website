import * as Bootstrap from 'bootstrap';

import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Images } from '../image.service';



declare const bootstrap: typeof Bootstrap;
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements AfterViewInit {

  /** The Images To Display*/
  @Input() images!: Images;

  private interval?: NodeJS.Timer;
  constructor(public colorScheme: ColorSchemeService) {
  }
  @ViewChild("carousel") carousel!: ElementRef<HTMLDivElement>;
  /**
   * Start carousel rotation
   */
  ngAfterViewInit(): void {
    new bootstrap.Carousel(this.carousel.nativeElement, {
      ride: "carousel",
      interval: 2000
    });
  }
}
