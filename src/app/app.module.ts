import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day1o1Component } from './day-1/day-1-1/day-1-1.component';
import { Day1o2Component } from './day-1/day-1-2/day-1-2.component';
import { Day2o1Component } from './day-2/day2o1/day2o1.component';
import { Day2o2Component } from './day-2/day2o2/day2o2.component';
import { Day3o1Component } from './day-3/day3o1/day3o1.component';
import { Day3o2Component } from './day-3/day3o2/day3o2.component';
import { Day4o1Component } from './day-4/day4o1/day4o1.component';
import { Day5o1Component } from './day-5/day5o1/day5o1.component';
import { Day6o1Component } from './day-6/day6o1/day6o1.component';
import { Day6o2Component } from './day-6/day6o2/day6o2.component';

@NgModule({
  declarations: [
    AppComponent,
    Day1o1Component,
    Day1o2Component,
    Day2o1Component,
    Day2o2Component,
    Day3o1Component,
    Day3o2Component,
    Day4o1Component,
    Day5o1Component,
    Day6o1Component,
    Day6o2Component
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
