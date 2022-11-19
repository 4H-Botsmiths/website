import { Images, ImageService } from 'src/app/image.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  public fllChallengeImage?: Images[number];
  public fllChallengeImages: Images = [];

  constructor(private imageService: ImageService) { }
  /**
   * Fetch images
   */
  ngOnInit() {
    this.fllChallengeImages = this.imageService.find('fll')!.find(program => program.name === 'challenge')?.children!;
    this.fllChallengeImage = this.imageService.extractDisplay(this.fllChallengeImages);
  }
}
