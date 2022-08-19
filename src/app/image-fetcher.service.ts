import { Injectable } from '@angular/core';

import fllChallengeMap from '../assets/images/fll/challenge/map.json';
import fllExploreMap from '../assets/images/fll/explore/map.json';
import fllMap from '../assets/images/fll/map.json';
import frcMap from '../assets/images/frc/map.json';
import ftcMap from '../assets/images/ftc/map.json';
import imagesMap from '../assets/images/map.json';
import minecraftMap from '../assets/images/minecraft/map.json';
import sponsorsMap from '../assets/images/sponsors/map.json';



@Injectable({
  providedIn: 'root'
})
export class ImageFetcherService {
  /**
   * A list of maps in the images directory
   */
  private readonly maps = {
    all: imagesMap,
    sponsors: sponsorsMap,
    frc: frcMap,
    ftc: ftcMap,
    minecraft: minecraftMap,
    fll: fllMap,
    'fll/explore': fllExploreMap,
    'fll/challenge': fllChallengeMap
  };
  /**
   * @async
   * @param directory where to search for the images
   * @returns /directory/file array
   */
  async getImages(directory: 'all' | 'sponsors' | 'frc' | 'ftc' | 'minecraft' | 'fll' | 'fll/explore' | 'fll/challenge', options?: Options) {
    const images: Image[] = await this.pursueImages(directory, { recursive: options?.recursive ?? false, titles: options?.titles ?? true, descriptions: options?.descriptions ?? false });
    //setTimeout(() => console.log('Images Fetched', images), 1000);
    console.log('Images Fetched', images);
    return images;
  }
  /**
   * @async
   * @param directory the directory to pursue
   * @returns /directory/file array
   */
  private async pursueImages(directory: string, options: Options): Promise<Image[]> {
    const images: Image[] = [];
    const map: File[] = this.maps[directory as 'all'] as File[];
    let imgs = 0, loadedImgs = 0;
    map.forEach(async file => {
      if (file.type === 'file') {
        imgs++;
        const src = file.path.includes('://') ? file.path : this.join('assets/images/', directory === 'all' ? undefined : directory, file.path);
        const img = new Image();
        img.src = src;
        img.onload = (/*event*/) => {
          //const loadedImage: any = event.currentTarget;
          images.push({ src: src, title: options.titles ? file.name : undefined, description: options.descriptions ? file.description : undefined, height: img.height, width: img.width });
          loadedImgs++;
        };
      } else if (options.recursive) {
        images.push(...(await this.pursueImages(file.path.split('/').pop() as 'all', options)));
      }
    });
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (loadedImgs >= imgs) {
          clearInterval(interval);
          resolve(images);
        }
      }, 100);
    });
  }

  /**
   *
   * @param directory where to search for the images
   * @returns /directory/file array
   */
  getImagesSync(directory: 'all' | 'sponsors' | 'frc' | 'ftc' | 'minecraft' | 'fll' | 'fll/explore' | 'fll/challenge', options?: Options) {
    const images: ImageSync[] = this.pursueImagesSync(directory, { recursive: options?.recursive ?? false, titles: options?.titles ?? true, descriptions: options?.descriptions ?? false });
    //setTimeout(() => console.log('Images Fetched', images), 1000);
    console.log('Images Fetched', images);
    return images;
  }
  /**
  *
  * @param directory the directory to pursue
  * @returns /directory/file array
  */
  private pursueImagesSync(directory: string, options: Options): ImageSync[] {
    const images: ImageSync[] = [];
    const map: File[] = this.maps[directory as 'all'] as File[];
    let imgs = 0, loadedImgs = 0;
    map.forEach(file => {
      if (file.type === 'file') {
        imgs++;
        const src = file.path.includes('://') ? file.path : this.join('assets/images/', directory === 'all' ? undefined : directory, file.path);          //const loadedImage: any = event.currentTarget;
        images.push({ src: src, title: options.titles ? file.name : undefined, description: options.descriptions ? file.description : undefined });
        loadedImgs++;
      } else if (options.recursive) {
        images.push(...(this.pursueImagesSync(file.path.split('/').pop() as 'all', options)));
      }
    });
    return images;
  }

  /**
   * A makeshift function to replicate the {@link path.join()} function
   * @param paths the paths to join
   * @returns the joined path
   */
  join(...paths: (string | undefined)[]): string {
    let joinedPath = '';
    paths.forEach(path => {
      if (path) {
        joinedPath += path.endsWith('/') ? path : path + '/';
      }
    });
    return joinedPath.slice(0, -1);
  }
  constructor() { }
}
export interface File {
  type: "file" | 'directory',
  name?: string,
  description?: string,
  path: string;
}
export interface Image {
  /** What photos to load */
  src: string;
  /** Caption Title to display (Optional)*/
  title?: string;
  /** Text to display on hover */
  description?: string;
  /** Image height */
  height: number;
  /** Image width */
  width: number;
}
export interface ImageSync {
  /** What photos to load */
  src: string;
  /** Caption Title to display (Optional)*/
  title?: string;
  /** Text to display on hover */
  description?: string;
}
interface Options {
  /** Wether or not to pursue child folders
   * @default false
  */
  recursive?: boolean;
  /** Wether or not to return titles for the images if possible
   * @default true
  */
  titles?: boolean;
  /** Wether or not to return descriptions for the images if possible
   * @default false
  */
  descriptions?: boolean;
}
