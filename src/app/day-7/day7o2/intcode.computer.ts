import { Mode } from './mode.enum';

export class IntCodeComputer {
  log: any[] = [];
  inputs: number[] = [];
  pointer = 0;

  constructor(public program: number[], phaseSetting: number) {
    this.inputs.push(phaseSetting);
  }

  /**
   * @returns boolean indicating whether computer has halted
   */
  public run(): boolean {
    for (; this.pointer < this.program.length; ) {
      const { opcode, modes } = readParameters(this.program[this.pointer]);
      switch (opcode) {
        case 1:
          this.add(this.pointer, modes);
          this.pointer += 4;
          break;
        case 2:
          this.multiply(this.pointer, modes);
          this.pointer += 4;
          break;
        case 3:
          this.getInput(this.pointer);
          this.pointer += 2;
          break;
        case 4:
          this.logOutput(this.pointer, modes);
          this.pointer += 2;
          return false;
        case 5:
          this.pointer = this.jumpIfTrue(this.pointer, modes);
          break;
        case 6:
          this.pointer = this.jumpIfFalse(this.pointer, modes);
          break;
        case 7:
          this.lessThan(this.pointer, modes);
          this.pointer += 4;
          break;
        case 8:
          this.equals(this.pointer, modes);
          this.pointer += 4;
          break;
        case 99:
          this.pointer = null;
          return true;
        default:
          throw Error(`OPCode ${opcode} not recognized`);
      }
    }
    return false;
  }

  private add(pointer: number, modes: Mode[]) {
    const params = this.getXParameters(2, pointer, modes);
    const writeAddr = this.program[pointer + 3];
    this.program[writeAddr] = params[0] + params[1];
  }

  private multiply(pointer: number, modes: Mode[]) {
    const params = this.getXParameters(2, pointer, modes);
    const writeAddr = this.program[pointer + 3];
    this.program[writeAddr] = params[0] * params[1];
  }

  private getInput(pointer: number) {
    const input = this.inputs.pop();
    this.program[this.program[pointer + 1]] = input;
  }

  private logOutput(pointer: number, modes: Mode[]) {
    const params = this.getXParameters(1, pointer, modes);
    this.log.push(params[0]);
  }

  private jumpIfTrue(pointer: number, modes: Mode[]): number {
    const params = this.getXParameters(2, pointer, modes);
    return params[0] !== 0 ? params[1] : pointer + 3;
  }

  private jumpIfFalse(pointer: number, modes: Mode[]): number {
    const params = this.getXParameters(2, pointer, modes);
    return params[0] === 0 ? params[1] : pointer + 3;
  }

  private lessThan(pointer: number, modes: Mode[]) {
    const params = this.getXParameters(2, pointer, modes);
    this.program[this.program[pointer + 3]] = params[0] < params[1] ? 1 : 0;
  }

  private equals(pointer: number, modes: Mode[]) {
    const params = this.getXParameters(2, pointer, modes);
    this.program[this.program[pointer + 3]] = params[0] === params[1] ? 1 : 0;
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
