import { Component } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';



@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent  {

  constructor(public colorScheme: ColorSchemeService) { }

}
