import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Images, ImageService } from '../image.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sponsorImages: Images = [];
  public mapLoading = true;

  constructor(public colorScheme: ColorSchemeService, public imageService: ImageService) { }

  /**
   * Load sponsor images
   */
  ngOnInit() {
    this.sponsorImages = this.imageService.find('sponsors')!;
  }
}
