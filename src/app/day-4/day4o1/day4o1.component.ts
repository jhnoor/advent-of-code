import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day4o1',
  templateUrl: './day4o1.component.html',
  styleUrls: ['./day4o1.component.scss']
})
export class Day4o1Component implements OnInit {
  input = [147981, 691423];

  result = 0;

  constructor() {}

  ngOnInit() {
    for (let password = this.input[0]; password < this.input[1]; password++) {
      const passwordString = `${password}`;
      if (
        areTwoAdjacentDigitsTheSame(passwordString) &&
        areLeftToRightNumbersAlwaysIncreasing(passwordString)
      ) {
        this.result++;
      }
    }
  }
}

const areTwoAdjacentDigitsTheSame = (password: string): boolean => {
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      if (password.includes(password[i] + password[i] + password[i])) {
        continue;
      }
      return true;
    }
  }
  return false;
};

const areLeftToRightNumbersAlwaysIncreasing = (password: string): boolean => {
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] > password[i + 1]) {
      return false;
    }
  }
  return true;
};
