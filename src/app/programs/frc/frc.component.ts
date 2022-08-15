import { ImageFetcherService, ImageSync } from 'src/app/image-fetcher.service';

import { Component } from '@angular/core';



@Component({
  selector: 'app-frc',
  templateUrl: './frc.component.html',
  styleUrls: ['./frc.component.scss']
})
export class FrcComponent /*implements OnInit*/ {
  public frcImages: ImageSync[] = [];

  constructor(public imageFetcher: ImageFetcherService) {
    this.frcImages = this.imageFetcher.getImagesSync('frc');
  }

  /*ngOnInit() {
  }*/
}
