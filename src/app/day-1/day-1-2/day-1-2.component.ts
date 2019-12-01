import { Component, OnInit } from '@angular/core';
import { input } from '../input';

@Component({
  selector: 'app-day-1-2',
  templateUrl: './day-1-2.component.html',
  styleUrls: ['./day-1-2.component.scss']
})
export class Day1o2Component implements OnInit {
  input = input;
  result: any;
  constructor() {}

  ngOnInit() {
    this.result = input
      .map(mass => mass / 3)
      .map(x => Math.floor(x))
      .map(x => x - 2)
      .map(this.calculateFuelMass)
      .reduce((p, c) => p + c, 0);
  }

  calculateFuelMass(mass: number): number {
    let accumulateFuel = 0;
    let f_mass = mass;
    while (true) {
      const fuel = Math.floor(f_mass / 3) - 2;
      if (fuel > 0) {
        accumulateFuel += fuel;
        f_mass = fuel;
      } else {
        break;
      }
    }
    return mass + accumulateFuel;
  }
}
