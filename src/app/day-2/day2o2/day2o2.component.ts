import { Component, OnInit } from '@angular/core';
import { input } from '../input';

@Component({
  selector: 'app-day2o2',
  templateUrl: './day2o2.component.html',
  styleUrls: ['./day2o2.component.scss']
})
export class Day2o2Component implements OnInit {
  input = [...input];
  result: number;

  constructor() {}

  ngOnInit() {
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const currentInput = [...this.input];
        const result = this.process(currentInput, noun, verb);

        if (result[0] === 19690720) {
          this.result = result[0];
          this.input = currentInput;
          return;
        }
      }
    }
  }

  process(program: number[], noun: number, verb: number): number[] {
    const SKIP_INDICES = 4;
    program[1] = noun;
    program[2] = verb;
    for (let i = 0; i < program.length; ) {
      switch (program[i]) {
        case 1:
          program[program[i + 3]] = this.add(
            program[program[i + 1]],
            program[program[i + 2]]
          );
          i += SKIP_INDICES;
          break;
        case 2:
          program[program[i + 3]] = this.multiply(
            program[program[i + 1]],
            program[program[i + 2]]
          );
          i += SKIP_INDICES;
          break;
        case 99:
          return program;
        default:
          throw Error(`OPCode ${program[i]} not recognized`);
      }
    }
    return program;
  }

  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }
}
