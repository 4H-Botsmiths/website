import { ImageFetcherService, ImageSync } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  public fllChallengeImage?: ImageSync;
  public fllChallengeImages: ImageSync[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.fllChallengeImages = this.imageFetcher.getImagesSync('fll/challenge');
    this.fllChallengeImage = this.imageFetcher.getImagesSync('all').find(image => image.title === 'fll challenge team');
  }
}
