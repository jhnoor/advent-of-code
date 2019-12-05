import { Component, OnInit } from '@angular/core';
import { add, multiply } from 'src/app/util';
import { Mode } from './mode.enum';
import { puzzleInput } from '../input';

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
  }

  process(program: number[]): number[] {
    const inputFromUser = +prompt('Input');

    for (let i = 0; i < program.length; ) {
      const { opcode, modes } = readParameters(program[i]);
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
        case 5:
          i = this.caseFive(i, program, modes);
          break;
        case 6:
          i = this.caseSix(i, program, modes);
          break;
        case 7:
          this.caseSeven(i, program, modes);
          i += 4;
          break;
        case 8:
          this.caseEight(i, program, modes);
          i += 4;
          break;
        case 99:
          return program;
        default:
          throw Error(`OPCode ${opcode} not recognized`);
      }
    }
    return program;
  }

  caseEight(i: number, program: number[], modes: Mode[]) {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const input1 = { mode: modes[1], val: program[i + 2] };
    const input2 = { mode: modes[2], val: program[i + 3] };
    const actualInputs = determineMode(program, [input0, input1, input2]);

    program[input2.val] = actualInputs[0] === actualInputs[1] ? 1 : 0;
  }

  caseSeven(i: number, program: number[], modes: Mode[]) {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const input1 = { mode: modes[1], val: program[i + 2] };
    const input2 = { mode: modes[2], val: program[i + 3] };
    const actualInputs = determineMode(program, [input0, input1, input2]);

    program[input2.val] = actualInputs[0] < actualInputs[1] ? 1 : 0;
  }

  caseSix(i: number, program: number[], modes: Mode[]): number {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const input1 = { mode: modes[1], val: program[i + 2] };

    const actualInputs = determineMode(program, [input0, input1]);
    return actualInputs[0] === 0 ? actualInputs[1] : i + 3;
  }

  caseFive(i: number, program: number[], modes: Mode[]): number {
    const input0 = { mode: modes[0], val: program[i + 1] };
    const input1 = { mode: modes[1], val: program[i + 2] };

    const actualInputs = determineMode(program, [input0, input1]);
    return actualInputs[0] !== 0 ? actualInputs[1] : i + 3;
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
    this.logOutput.push(output);
  }
}

const readParameters = (instruction: number): { opcode: number; modes: Mode[] } => {
  const params = `${instruction}`.padStart(5, '0');
  return {
    opcode: +params.slice(params.length - 2),
    modes: [+params[2], +params[1], +params[0]]
  };
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
