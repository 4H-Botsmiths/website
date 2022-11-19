

import { Injectable } from '@angular/core';

import images from '../assets/images/map.json';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  find(program: string): Images | undefined {
    return images.children.find(child => child.name === program)?.children;//?.map(image => image.path);
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
