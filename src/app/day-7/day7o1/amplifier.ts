import { IntCodeComputer } from './intcode.computer';

export class Amplifier {
  input: number;
  puzzleInput: number[];
  intCode: IntCodeComputer;

  constructor(private phaseSetting: number, puzzleInput: number[]) {
    this.puzzleInput = [...puzzleInput];
  }

  run(): number {
    const intCode = new IntCodeComputer(this.puzzleInput, [this.input, this.phaseSetting]);
    intCode.run();
    return intCode.log.pop();
  }
}
