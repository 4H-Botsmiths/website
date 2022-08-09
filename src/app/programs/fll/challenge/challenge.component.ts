import { Image, ImageFetcherService } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  public fllChallengeImage?: Image;
  public fllChallengeImages: Image[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.imageFetcher.getImages('fll/challenge').then(images => this.fllChallengeImages = images);
    this.imageFetcher.getImages('all').then(images => this.fllChallengeImage = images.find(image => image.title === 'fll challenge team'));
  }
}
