import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day1o1Component } from './day-1/day-1-1/day-1-1.component';
import { Day1o2Component } from './day-1/day-1-2/day-1-2.component';
import { Day2o1Component } from './day-2/day2o1/day2o1.component';
import { Day2o2Component } from './day-2/day2o2/day2o2.component';

@NgModule({
  declarations: [AppComponent, Day1o1Component, Day1o2Component, Day2o1Component, Day2o2Component],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
