import { ImageFetcherService, ImageSync } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  public fllExploreImage?: ImageSync;
  public fllExploreImages: ImageSync[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.fllExploreImages = this.imageFetcher.getImagesSync('fll/explore');
    this.fllExploreImage = this.imageFetcher.getImagesSync('all').find(image => image.title === 'fll explore team');
  }
}
