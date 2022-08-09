import { Image, ImageFetcherService } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  public fllExploreImage?: Image;
  public fllExploreImages: Image[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.imageFetcher.getImages('fll/explore').then(images => this.fllExploreImages = images);
    this.imageFetcher.getImages('all').then(images => this.fllExploreImage = images.find(image => image.title === 'fll explore team'));
  }
}
