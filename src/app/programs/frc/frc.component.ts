import { Image, ImageFetcherService } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-frc',
  templateUrl: './frc.component.html',
  styleUrls: ['./frc.component.scss']
})
export class FrcComponent implements OnInit {
  public frcImage?: Image;
  public frcImages: Image[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.imageFetcher.getImages('frc').then(images => this.frcImages = images);
    this.imageFetcher.getImages('all').then(images => this.frcImage = images.find(image => image.title === 'frc team'));
  }
}
