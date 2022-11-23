

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import images from '../assets/images/map.json';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images = images;

  constructor(private http: HttpClient) {
    console.log('Fetching pre-compiled images...');
    this.http.get('https://github.com/4H-Botsmiths/website/blob/gh-pages/assets/images/map.data.json?raw=true').subscribe((data: any) => {
      console.log('Fetched pre-compiled images');
      this.images = data;
    });
  }
  find(program: string): Images | undefined {
    return this.images.children.find(child => child.name === program)?.children;//?.map(image => image.path);
  }
  extractDisplay(images: Images): Images[number] {
    return images.find(image => image.name.startsWith('display')) ?? images[0];
  }
}
export type Images = ({
  path: string;
  name: string;
  children?: Images;
})[];
