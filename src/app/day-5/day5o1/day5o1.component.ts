import { Component, OnInit } from '@angular/core';
import { puzzleInput } from '../input';
import { add, multiply } from 'src/app/util';
import { Mode } from './mode.enum';
import { input } from 'src/app/day-2/input';

@Component({
  selector: 'app-day5o1',
  templateUrl: './day5o1.component.html',
  styleUrls: ['./day5o1.component.scss']
})
export class Day5o1Component implements OnInit {
  result: any;
  logOutput = [];

  constructor() {}

  ngOnInit() {
    this.result = this.process([...puzzleInput]);
    // this.result = this.process([1002, 4, 3, 4, 33]);
    // this.result = this.process([...input]);
  }

  process(program: number[]): number[] {
    const inputFromUser = +prompt('Input');

    for (let i = 0; i < program.length; ) {
      const { opcode, modes } = readParameters(program[i]);

      if (opcode === 3 || opcode === 4) {
        // debugger;
      }

      switch (opcode) {
        case 1:
          this.caseOne(i, program, modes);
          i += 4;
          break;
        case 2:
          this.caseTwo(i, program, modes);
          i += 4;
          break;
        case 3:
          this.caseThree(i, program, modes, inputFromUser);
          i += 2;
          break;
        case 4:
          this.caseFour(i, program, modes);
          i += 2;
          break;
        case 99:
          return program;
        default:
          throw Error(`OPCode ${opcode} not recognized`);
      }
    }
    return program;
  }

  caseFour(i: number, program: number[], modes: Mode[]) {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const actualInputs = determineMode(program, [input0]);

    this.log(actualInputs[0], program, i, modes);
  }

  caseThree(i: number, program: number[], modes: Mode[], inputFromUser: number) {
    const input0 = { mode: modes[0], val: program[i + 1] };
    program[input0.val] = inputFromUser;
  }

  caseTwo(i: number, program: number[], modes: Mode[]) {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const input1 = { mode: modes[1], val: program[i + 2] };
    const writeAddr = program[i + 3];
    const actualInputs = determineMode(program, [input0, input1]);
    program[writeAddr] = multiply(actualInputs[0], actualInputs[1]);
  }

  caseOne(i: number, program: number[], modes: Mode[]) {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const input1 = { mode: modes[1], val: program[i + 2] };
    const writeAddr = program[i + 3];
    const actualInputs = determineMode(program, [input0, input1]);
    program[writeAddr] = add(actualInputs[0], actualInputs[1]);
  }

  log(output, program, i, modes) {
    if(output !== 0) {
      debugger;
    }
    this.logOutput.push(output);
  }
}

const readParameters = (instruction: number): { opcode: number; modes: Mode[] } => {
  const params = `${instruction}`.padStart(5, '0');
  const foo = {
    opcode: +params.slice(params.length - 2),
    modes: [+params[2], +params[1], +params[0]]
  };

  return foo;
};

const determineMode = (program, inputs: Array<{ mode: Mode; val: number }>) => {
  const actualInputs = [];

  for (const input of inputs) {
    switch (input.mode) {
      case Mode.Position:
        actualInputs.push(program[input.val]);
        break;

      case Mode.Immediate:
        actualInputs.push(input.val);
        break;

      default:
        throw Error('Invalid mode');
    }
  }

  return actualInputs;
};
