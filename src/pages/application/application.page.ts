import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import EnglishLocale from 'locales/en.json';

@Component({
  selector: 'application',
  templateUrl: 'application.page.html',
  styleUrls: ['application.page.scss'],
})
export class ApplicationPage implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    const { translateService } = this;

    translateService.setTranslation('en', EnglishLocale);
    translateService.use('en');
  }
}
