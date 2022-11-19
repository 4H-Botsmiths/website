import { Images, ImageService } from 'src/app/image.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  public fllExploreImage?: Images[number];
  public fllExploreImages: Images = [];

  constructor(private imageService: ImageService) { }
  /**
   * Fetch images
   */
  ngOnInit() {
    this.fllExploreImages = this.imageService.find('fll')!.find(program => program.name === 'challenge')?.children!;
    this.fllExploreImage = this.imageService.extractDisplay(this.fllExploreImages);
  }
}
