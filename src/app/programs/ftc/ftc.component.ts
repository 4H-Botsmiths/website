import { Images, ImageService } from 'src/app/image.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-ftc',
  templateUrl: './ftc.component.html',
  styleUrls: ['./ftc.component.scss']
})
export class FtcComponent implements OnInit {
  public ftcImages: Images = [];
  public ftcImage?: Images[number];

  constructor(private imageService: ImageService) { }
  /**
   * Fetch images
   */
  ngOnInit() {
    this.ftcImages = this.imageService.find('ftc')!;
    this.ftcImage = this.imageService.extractDisplay(this.ftcImages);
  }
}
