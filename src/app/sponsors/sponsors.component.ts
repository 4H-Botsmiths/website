import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { ImageFetcherService } from '../image-fetcher.service';
import sponsorOptions from './sponsorOptions.json';
import sponsors from './sponsors.json';



@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {
  public sponsors: Sponsor[] = sponsors;
  public sponsorOptions: Option[] = sponsorOptions;

  public form = {
    valid: false,
    companyName: '',
    companyHomepage: '',
    companyLogo: '',
    amount: 0,
    additionalInfo: ''
  };
  public link = '/sponsors';
  constructor(public colorScheme: ColorSchemeService, public imageFetcher: ImageFetcherService, public router: Router) { }

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.form.valid = this.form.companyName !== '' && this.form.amount >= 100 && (this.form.companyLogo ? this.isValidUrl(this.form.companyLogo) : true);
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        clearInterval(interval);
        // Show progress spinner or progress bar
      }
      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        if (event.url.endsWith('options') || event.url.endsWith('contact-us')) {
          this.link = event.url;
          this.openModal();
        }
      }
    });
    if (this.router.url.endsWith('options') || this.router.url.endsWith('contact-us')) {
      this.link = this.router.url;
      this.openModal();
    }
  }
  routerLinkActive(link: string): boolean {
    return this.router.isActive(link, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' });
  }
  isValidUrl(url: string): boolean {
    return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
  }

  openModal() {
    if (!document.getElementById('sponsorModal')!!.classList.contains('show')) {
      document.getElementById('displaySponsorOptions')?.click();
    }
  }
}
interface Option {
  amount: number;
  benefits: string[];
}
interface Sponsor {
  year: number;
  sponsors: SponsorEntry[];
}
interface SponsorEntry {
  sponsor: string;
  link?: string;
}