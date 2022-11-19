import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Images, ImageService } from '../image.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public sponsorImages: Images = [];
  public mapLoading = true;

  constructor(public colorScheme: ColorSchemeService, public imageService: ImageService) { }

  /**
   * Load sponsor images
   */
  ngOnInit() {
    this.sponsorImages = this.imageService.find('sponsors')!;
  }
  @ViewChild('iframe') iframe!: ElementRef;
  ngAfterViewInit(): void {
    const iframe: HTMLIFrameElement = this.iframe.nativeElement;
    // your code here
    setTimeout(() => {
      iframe.onload = () => {
        this.mapLoading = false;
      };
      iframe.src = 'https://maps.google.com/maps?q=15019%20Three%20Lakes%20Rd,%20Snohomish,%20WA%2098290&t=k&z=13&ie=UTF8&iwloc=&output=embed';
    }, 1000);
  }
}
