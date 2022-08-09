import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Image, ImageFetcherService } from '../image-fetcher.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sponsorImages: Image[] = [];

  constructor(public colorScheme: ColorSchemeService, public imageFetcher: ImageFetcherService) { }

  async ngOnInit() {
    this.imageFetcher.getImages('sponsors', { titles: false }).then(images => this.sponsorImages = images);
  }
}
