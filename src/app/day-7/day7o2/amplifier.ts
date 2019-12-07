import { IntCodeComputer } from './intcode.computer';

export class Amplifier {
  puzzleInput: number[];
  private intCode: IntCodeComputer;
  lastOutput: number;
  halted = false;

  constructor(private phaseSetting: number, puzzleInput: number[]) {
    this.puzzleInput = [...puzzleInput];
    this.intCode = new IntCodeComputer(this.puzzleInput, this.phaseSetting);
  }

  addInput(input: number) {
    this.intCode.inputs.unshift(input);
  }

  run(): number {
    this.halted = this.intCode.run();
    if (this.halted) {
      this.lastOutput = this.intCode.inputs.pop();
      return this.lastOutput;
    }
    this.lastOutput = this.intCode.log.pop();
    return this.lastOutput;
  }
}
