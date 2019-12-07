import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: 'day1p1', component: Day1o1Component },
  { path: 'day1p2', component: Day1o2Component },
  { path: 'day2p1', component: Day2o1Component },
  { path: 'day2p2', component: Day2o2Component },
  { path: 'day3p1', component: Day3o1Component },
  { path: 'day3p2', component: Day3o2Component },
  { path: 'day4p1', component: Day4o1Component },
  { path: 'day5p1', component: Day5o1Component },
  { path: 'day6p1', component: Day6o1Component },
  { path: 'day6p2', component: Day6o2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
