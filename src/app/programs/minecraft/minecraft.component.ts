import { Images, ImageService } from 'src/app/image.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-minecraft',
  templateUrl: './minecraft.component.html',
  styleUrls: ['./minecraft.component.scss']
})
export class MinecraftComponent implements OnInit {
  public minecraftImages: Images = [];
  public minecraftImage?: Images[number];

  constructor(public imageService: ImageService) { }

  /**
   * Fetch images
   */
  ngOnInit() {
    this.minecraftImages = this.imageService.find('minecraft')!;
    this.minecraftImage = this.imageService.extractDisplay(this.minecraftImages);
  }
}
