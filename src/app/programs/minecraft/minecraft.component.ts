import { Image, ImageFetcherService } from 'src/app/image-fetcher.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-minecraft',
  templateUrl: './minecraft.component.html',
  styleUrls: ['./minecraft.component.scss']
})
export class MinecraftComponent implements OnInit {
  public minecraftImage?: Image;
  public minecraftImages: Image[] = [];

  constructor(public imageFetcher: ImageFetcherService) { }

  ngOnInit() {
    this.imageFetcher.getImages('minecraft').then(images => this.minecraftImages = images);
    this.imageFetcher.getImages('all').then(images => this.minecraftImage = images.find(image => image.title === 'minecraft team'));
  }
}
