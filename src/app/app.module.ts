import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day1o1Component } from './day-1/day-1-1/day-1-1.component';
import { Day1o2Component } from './day-1/day-1-2/day-1-2.component';

@NgModule({
  declarations: [AppComponent, Day1o1Component, Day1o2Component],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
