import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  public darkMode;
  public lightMode;

  constructor() {
    this.darkMode = this.getDarkMode();
    this.lightMode = this.getLightMode();
    window.matchMedia("(prefers-color-scheme: dark)").onchange = () => {
      location.reload();
      this.darkMode = this.getDarkMode();
      this.lightMode = this.getLightMode();
    }
  }

  public getDarkMode() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return true;
    }
  }
  public getLightMode() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return !window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return false;
    }
  }
}
