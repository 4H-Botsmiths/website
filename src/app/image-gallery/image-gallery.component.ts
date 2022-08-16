import { Component, Input } from '@angular/core';

import { Image } from '../image-fetcher.service';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  /** What photos to load */
  @Input() images!: Image[];

  constructor() {
    if (!this.images) {
      this.images = [];
    }
  }

  getImagesSync(): Image[] {
    return this.images.sort((a, b) => a.width - b.width);
  }
}
