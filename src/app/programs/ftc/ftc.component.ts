import { Image, ImageFetcherService } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-ftc',
  templateUrl: './ftc.component.html',
  styleUrls: ['./ftc.component.scss']
})
export class FtcComponent implements OnInit {
  public ftcImage?: Image;
  public ftcImages: Image[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.imageFetcher.getImages('ftc').then(images => this.ftcImages = images);
    this.imageFetcher.getImages('all').then(images => this.ftcImage = images.find(image => image.title === 'ftc team'));
  }
}
