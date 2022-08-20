import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class SponsorsComponent implements OnInit, AfterViewInit {
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
  constructor(public colorScheme: ColorSchemeService, public imageFetcher: ImageFetcherService, public router: Router) { }

  /**
   * add sponsor options Modal listeners
   */
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
        if (this.routerLinkActive('/sponsors/options') || this.routerLinkActive('/sponsors/contact-us')) {
          this.openModal();
        }
      }
    });
  }
  /**
   * Open sponsor options modal if needed
   */
  ngAfterViewInit(): void {
    if (this.routerLinkActive('/sponsors/options') || this.routerLinkActive('/sponsors/contact-us')) {
      this.openModal();
    }
  }
  /**
 * Returns wether or not a link is active
 * @param {string} link the link to test
 * @returns wether or not the {@link link} is active
 */
  routerLinkActive(link: string): boolean {
    return this.router.isActive(link, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' });
  }
  /**
* Returns wether or not a link is valid
* @param {string} link the link to test
* @returns wether or not the {@link link} is valid
*/
  isValidUrl(link: string): boolean {
    return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(link);
  }

  @ViewChild("sponsorModal") sponsorModal!: ElementRef;
  @ViewChild("sponsorModalButton") sponsorModalButton!: ElementRef;
  /**
   * Open the sponsorship options modal
   */
  openModal() {
    if (!this.sponsorModal.nativeElement?.classList.contains('show')) {
      this.sponsorModalButton.nativeElement?.click();
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
