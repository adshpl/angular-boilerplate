import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationPage } from 'pages/application/application.page';
import { Components } from 'components/components';
import { Graphqls } from 'graphql/graphqls';
import { Logger } from 'logger/logger';
import { Pages } from 'pages/pages';
import { Services } from 'services/services';
import { ApplicationRoutingModule } from './application-routing.module';

@NgModule({
  declarations: [
    ...Components,
    ...Pages,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ApplicationRoutingModule,
    Logger,
  ],
  providers: [
    ...Graphqls,
    ...Services,
  ],
  bootstrap: [
    ApplicationPage,
  ],
})
export class ApplicationModule {}
