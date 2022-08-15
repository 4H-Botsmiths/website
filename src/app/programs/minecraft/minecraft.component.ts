import { ImageFetcherService, ImageSync } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-minecraft',
  templateUrl: './minecraft.component.html',
  styleUrls: ['./minecraft.component.scss']
})
export class MinecraftComponent implements OnInit {
  public minecraftImages: ImageSync[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.minecraftImages = this.imageFetcher.getImagesSync('minecraft');
  }
}
