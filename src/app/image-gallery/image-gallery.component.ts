import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Images } from '../image.service';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  /** What photos to load */
  @Input() images!: Images;
  public sortedImages: HTMLImageElement[] = [];
  constructor() {
  }
  @ViewChild('grid') grid!: ElementRef<HTMLDivElement>;
  ngAfterViewInit(): void {
    const interval = setInterval(() => {
      if (this.sortedImages.length) {
        clearInterval(interval);
        for (const image of this.sortedImages) {
          this.grid.nativeElement.appendChild(image);
        }
      }
    }, 500);
  }
  ngOnInit(): void {
    const images: HTMLImageElement[] = [];
    for (const image of this.images) {
      const img = new Image();
      img.onload = () => {
        images.push(img);
      };
      img.onerror = () => {
        images.push(img);
      };
      img.src = image.path;
      img.alt = image.name;
      img.classList.add('col');

    }
    const interval = setInterval(() => {
      if (images.length === this.images.length) {
        clearInterval(interval);
        this.sortedImages = images.sort((a, b) => a.naturalWidth - b.naturalWidth);
      }
    }, 500);
  }
}
