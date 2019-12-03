import { Component, OnInit } from '@angular/core';
import { exampleInput, input } from '../input';
import { Point, lineSegments, findIntersection, Cardinality } from '../util';


@Component({
  selector: 'app-day3o1',
  templateUrl: './day3o1.component.html',
  styleUrls: ['./day3o1.component.scss']
})
export class Day3o1Component implements OnInit {
  readonly origoPoint: Point = new Point(0, 0);

  width = 800;
  height = 600;
  viewBox = '0 0 800 600';
  scaleFactor = 0.1;

  input: string[][] = input;
  paths: string[] = [];
  points: Point[][] = [];

  intersectionPoints: Point[];

  result: number;
  constructor() {}

  ngOnInit() {
    for (let lineIndex = 0; lineIndex < this.input.length; lineIndex++) {
      this.paths[lineIndex] = 'M0,0';
      this.points[lineIndex] = [];
      this.input[lineIndex].forEach(direction => {
        this.appendDirection(direction, lineIndex);
      });
    }

    this.result = this.minManhattanDistanceToOrigoPoint();
  }

  minManhattanDistanceToOrigoPoint(): number {
    this.findAllIntersections(this.points);

    return Math.min(
      ...this.intersectionPoints
        .map(point => point.manhattanDistanceToPoint(this.origoPoint))
        .filter(distance => distance !== 0)
    );
  }

  /**
   * Finds all the intersecting points between the arrays of lines
   */
  findAllIntersections(points: Point[][]) {
    const line1Segments = lineSegments([this.origoPoint, ...points[0]]);
    const line2Segments = lineSegments([this.origoPoint, ...points[1]]);

    this.intersectionPoints = [];

    // Do some magic
    line1Segments.forEach(line1Segment => {
      line2Segments.forEach(line2Segment => {
        const point = findIntersection(line1Segment, line2Segment);
        if (point) {
          this.intersectionPoints.push(point);
        }
      });
    });
  }

  appendDirection(direction: string, index: number) {
    const lastPoint = this.getLastPointOrOrigo(index);

    const cardinality: Cardinality = direction[0] as Cardinality;
    const distance: number = +direction.slice(1);
    let point: Point;

    switch (cardinality) {
      case 'U':
        point = new Point(lastPoint.x, lastPoint.y - distance);
        break;
      case 'D':
        point = new Point(lastPoint.x, lastPoint.y + distance);
        break;
      case 'L':
        point = new Point(lastPoint.x - distance, lastPoint.y);
        break;
      case 'R':
        point = new Point(lastPoint.x + distance, lastPoint.y);
        break;
      default:
        throw Error('Unrecognized cardinality ' + cardinality);
    }

    this.paths[index] += `L${point.x},${point.y}`;
    this.points[index].push(point);
  }

  getLastPointOrOrigo(index: number): Point {
    if (this.points[index] && this.points[index].length >= 1) {
      const last = this.points[index][this.points[index].length - 1];
      return last;
    } else {
      return this.origoPoint;
    }
  }

  scale(factor: number) {
    if (factor > 0) {
      this.scaleFactor *= 1.5;
    } else {
      this.scaleFactor /= 1.5;
    }
  }
}
