import { ImageFetcherService, ImageSync } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-ftc',
  templateUrl: './ftc.component.html',
  styleUrls: ['./ftc.component.scss']
})
export class FtcComponent implements OnInit {
  public ftcImages: ImageSync[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.ftcImages = this.imageFetcher.getImagesSync('ftc');
  }
}
