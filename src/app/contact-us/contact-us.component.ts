import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';



@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public form = {
    valid: false,
    name: '',
    programs: {
      valid: false,
      frc: false,
      ftc: false,
      fll: {
        explore: false,
        challenge: false,
      },
      minecraft: false
    },
    additionalInfo: '',
  }

  constructor(public colorScheme: ColorSchemeService, private router: Router) { }

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.form.programs.valid = this.form.programs.frc || this.form.programs.ftc || this.form.programs.fll.challenge || this.form.programs.fll.explore || this.form.programs.minecraft
      this.form.valid = this.form.programs.valid && this.form.name !== '';
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        clearInterval(interval);
        // Show progress spinner or progress bar
      }
    });
  }


}
