import { Component, OnInit } from '@angular/core';
import { Amplifier } from './amplifier';
import { input } from '../input';

@Component({
  selector: 'app-day7o1',
  templateUrl: './day7o1.component.html',
  styleUrls: ['./day7o1.component.scss']
})
export class Day7o1Component implements OnInit {
  puzzleInput = input;
  result: number;

  ngOnInit() {
    const outputSpace = this.generatePhaseSettings().map(phaseSetting => {
      return this.amplify(phaseSetting, this.puzzleInput);
    });

    this.result = Math.max(...outputSpace);
  }

  amplify(phaseSettings: number[], puzzleInput: number[]): number {
    const amplifiers: Amplifier[] = [];
    for (const phaseSetting of phaseSettings) {
      const amplifier = new Amplifier(phaseSetting, puzzleInput);
      amplifiers.push(amplifier);
    }

    let output = 0;
    for (const amp of amplifiers) {
      amp.input = output;
      output = amp.run();
    }
    return output;
  }

  generatePhaseSettings() {
    const phaseSettings: number[][] = [];
    for (let a = 0; a <= 4; a++) {
      for (let b = 0; b <= 4; b++) {
        for (let c = 0; c <= 4; c++) {
          for (let d = 0; d <= 4; d++) {
            for (let e = 0; e <= 4; e++) {
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
