import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Day1o1Component } from './day-1/day-1-1/day-1-1.component';
import { Day1o2Component } from './day-1/day-1-2/day-1-2.component';


const routes: Routes = [
  {path: 'day1', component: Day1o1Component},
  {path: 'day2', component: Day1o2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
