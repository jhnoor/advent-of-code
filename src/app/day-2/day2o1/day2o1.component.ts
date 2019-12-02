import { Component, OnInit } from '@angular/core';
import { input } from '../input';

@Component({
  selector: 'app-day2o1',
  templateUrl: './day2o1.component.html',
  styleUrls: ['./day2o1.component.scss']
})
export class Day2o1Component implements OnInit {
  input = input;
  result: number[];
  constructor() {}

  ngOnInit() {
    this.process();
    this.result = this.input;
  }

  process() {
    const SKIP_INDICES = 4;
    for (let i = 0; i < this.input.length; ) {
      switch (this.input[i]) {
        case 1:
          this.input[this.input[i + 3]] = this.add(
            this.input[this.input[i + 1]],
            this.input[this.input[i + 2]]
          );
          i += SKIP_INDICES;
          break;
        case 2:
          this.input[this.input[i + 3]] = this.multiply(
            this.input[this.input[i + 1]],
            this.input[this.input[i + 2]]
          );
          i += SKIP_INDICES;
          break;
        case 99:
          return;
        default:
          debugger;
          throw Error(`OPCode ${this.input[i]} not recognized`);
      }
    }
  }

  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }
}
