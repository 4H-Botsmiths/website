import { Images, ImageService } from 'src/app/image.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-frc',
  templateUrl: './frc.component.html',
  styleUrls: ['./frc.component.scss']
})
export class FrcComponent implements OnInit {
  public frcImages: Images = [];
  public frcImage?: Images[number];

  constructor(private imageService: ImageService) {
  }
  /**
   * Fetch images
   */
  ngOnInit() {
    this.frcImages = this.imageService.find('frc')!;
    this.frcImage = this.imageService.extractDisplay(this.frcImages);
  }
}
