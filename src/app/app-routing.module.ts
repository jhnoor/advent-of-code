import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Day11Component } from './day-1/day-1-1/day-1-1.component';


const routes: Routes = [
  {path: 'day1', component: Day11Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
