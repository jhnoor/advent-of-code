import { Component, OnInit } from "@angular/core";
import { input } from "./input";

@Component({
  selector: "app-day-1-1",
  templateUrl: "./day-1-1.component.html",
  styleUrls: ["./day-1-1.component.scss"]
})
export class Day11Component implements OnInit {
  input = input;
  result: any;
  constructor() {}

  ngOnInit() {
    this.result = input
      .map(mass => mass / 3)
      .map(x => Math.floor(x))
      .map(x => x - 2)
      .reduce((p, c) => p + c, 0);
  }
}
