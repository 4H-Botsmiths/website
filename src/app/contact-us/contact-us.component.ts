import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';



@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {
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
  };
  public interval?: NodeJS.Timeout;

  constructor(public colorScheme: ColorSchemeService, private router: Router) { }


  /**
   * start form validation
   */
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.form.programs.valid = this.form.programs.frc || this.form.programs.ftc || this.form.programs.fll.challenge || this.form.programs.fll.explore || this.form.programs.minecraft;
      this.form.valid = this.form.programs.valid && this.form.name !== '';
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
