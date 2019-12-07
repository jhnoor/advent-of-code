import { Mode } from './mode.enum';

export class IntCodeComputer {
  log: any[] = [];
  inputs: number[];

  constructor(public program: number[], inputs: number[]) {
    this.inputs = [...inputs];
  }

  public run() {
    for (let i = 0; i < this.program.length; ) {
      const { opcode, modes } = readParameters(this.program[i]);
      switch (opcode) {
        case 1:
          this.add(i, modes);
          i += 4;
          break;
        case 2:
          this.multiply(i, modes);
          i += 4;
          break;
        case 3:
          this.getInput(i);
          i += 2;
          break;
        case 4:
          this.logOutput(i, modes);
          i += 2;
          break;
        case 5:
          i = this.jumpIfTrue(i, modes);
          break;
        case 6:
          i = this.jumpIfFalse(i, modes);
          break;
        case 7:
          this.lessThan(i, modes);
          i += 4;
          break;
        case 8:
          this.equals(i, modes);
          i += 4;
          break;
        case 99:
          return;
        default:
          throw Error(`OPCode ${opcode} not recognized`);
      }
    }
    return;
  }

  private add(i: number, modes: Mode[]) {
    const params = this.getXParameters(2, i, modes);
    const writeAddr = this.program[i + 3];
    this.program[writeAddr] = params[0] + params[1];
  }

  private multiply(i: number, modes: Mode[]) {
    const params = this.getXParameters(2, i, modes);
    const writeAddr = this.program[i + 3];
    this.program[writeAddr] = params[0] * params[1];
  }

  private getInput(i: number) {
    const input = this.inputs.pop();
    this.program[this.program[i + 1]] = input;
  }

  private logOutput(i: number, modes: Mode[]) {
    const params = this.getXParameters(1, i, modes);
    this.log.push(params[0]);
  }

  private jumpIfTrue(i: number, modes: Mode[]): number {
    const params = this.getXParameters(2, i, modes);
    return params[0] !== 0 ? params[1] : i + 3;
  }

  private jumpIfFalse(i: number, modes: Mode[]): number {
    const params = this.getXParameters(2, i, modes);
    return params[0] === 0 ? params[1] : i + 3;
  }

  private lessThan(i: number, modes: Mode[]) {
    const params = this.getXParameters(2, i, modes);
    this.program[this.program[i + 3]] = params[0] < params[1] ? 1 : 0;
  }

  private equals(i: number, modes: Mode[]) {
    const params = this.getXParameters(2, i, modes);
    this.program[this.program[i + 3]] = params[0] === params[1] ? 1 : 0;
  }

  private getXParameters(noOfParameters: number, i: number, modes: Mode[]): number[] {
    const inputs = [];
    for (let idx = 0; idx < noOfParameters; idx++) {
      inputs.push({ mode: modes[idx], val: this.program[i + idx + 1] });
    }

    return determineMode(this.program, inputs);
  }
}

const determineMode = (program, inputs: Array<{ mode: Mode; val: number }>): number[] => {
  return inputs.map(input => {
    switch (input.mode) {
      case Mode.Position:
        return program[input.val];
      case Mode.Immediate:
        return input.val;
      default:
        throw Error('Invalid mode');
    }
  });
};

const readParameters = (instruction: number): { opcode: number; modes: Mode[] } => {
  const params = `${instruction}`.padStart(5, '0');
  return {
    opcode: +params.slice(params.length - 2),
    modes: [+params[2], +params[1], +params[0]]
  };
};
