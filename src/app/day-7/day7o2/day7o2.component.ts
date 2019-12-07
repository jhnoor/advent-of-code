import { Component, OnInit } from '@angular/core';
import { Amplifier } from './amplifier';
import { input } from '../input';

@Component({
  selector: 'app-day7o2',
  templateUrl: './day7o2.component.html',
  styleUrls: ['./day7o2.component.scss']
})
export class Day7o2Component implements OnInit {
  puzzleInput = input;

  result: number;

  ngOnInit() {
    const outputSpace = this.generatePhaseSettings().map(phaseSetting => {
      return this.amplify(phaseSetting, this.puzzleInput);
    });

    this.result = Math.max(...outputSpace);
    // this.result = this.amplify([9, 8, 7, 6, 5], this.puzzleInput);
  }

  amplify(phaseSettings: number[], puzzleInput: number[]): number {
    const amplifiers: Amplifier[] = [];
    for (const phaseSetting of phaseSettings) {
      const amplifier = new Amplifier(phaseSetting, puzzleInput);
      amplifiers.push(amplifier);
    }

    let output = 0;
    while (true) {
      for (const amp of amplifiers) {
        if (amp.halted) {
          return amplifiers[amplifiers.length - 1].lastOutput;
        }
        amp.addInput(output);
        output = amp.run();
      }
    }
  }

  generatePhaseSettings() {
    const phaseSettings: number[][] = [];
    for (let a = 5; a <= 9; a++) {
      for (let b = 5; b <= 9; b++) {
        for (let c = 5; c <= 9; c++) {
          for (let d = 5; d <= 9; d++) {
            for (let e = 5; e <= 9; e++) {
              const arr = [a, b, c, d, e];

              if (new Set(arr).size !== arr.length) {
                continue;
              }

              phaseSettings.push(arr);
            }
          }
        }
      }
    }
    return phaseSettings;
  }
}
