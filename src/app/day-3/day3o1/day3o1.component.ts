import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { input, testInput, exampleInput } from '../input';

type Cardinality = 'U' | 'D' | 'L' | 'R';

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

  input: string[][] = input;
  paths: string[] = [];
  points: Point[][] = [];

  intersectionPoints: Point[];

  strokeColor = ['red', 'blue'];
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
    this.intersectionPoints = this.findAllIntersections(this.points);

    return Math.min(
      ...this.intersectionPoints
        .map(point => point.manhattanDistanceToPoint(this.origoPoint))
        .filter(distance => distance !== 0)
    );
  }

  /**
   * Finds all the intersecting points between the arrays of lines
   * @param points
   */
  findAllIntersections(points: Point[][]): Point[] {
    const line1Segments = lineSegments([this.origoPoint, ...points[0]]);
    const line2Segments = lineSegments([this.origoPoint, ...points[1]]);

    const intersectionPoints = [];

    // Do some magic
    line1Segments.forEach(line1Segment => {
      line2Segments.forEach(line2Segment => {
        const point = findIntersection(line1Segment, line2Segment);
        if (point) {
          intersectionPoints.push(point);
        }
      });
    });

    return intersectionPoints;
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
}

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  manhattanDistanceToPoint(referencePoint: Point): number {
    return Math.abs(this.x - referencePoint.x) + Math.abs(this.y - referencePoint.y);
  }
}

class LineSegment {
  a: Point;
  b: Point;

  constructor(a: Point, b: Point) {
    this.a = a;
    this.b = b;
  }
}

const lineSegments = (points: Point[]): LineSegment[] => {
  const segments: LineSegment[] = [];
  points.forEach((point, i) => {
    if (i + 1 > points.length - 1) {
      // There is no next point
      return;
    }

    segments.push(new LineSegment(points[i], points[i + 1]));
  });
  return segments;
};

const findIntersection = (line1: LineSegment, line2: LineSegment): Point | null => {
  const z1 = line1.a.x - line1.b.x;
  const z2 = line2.a.x - line2.b.x;
  const z3 = line1.a.y - line1.b.y;
  const z4 = line2.a.y - line2.b.y;
  const dist = z1 * z4 - z3 * z2;
  if (dist === 0) {
    return null;
  }
  const tempA = line1.a.x * line1.b.y - line1.a.y * line1.b.x;
  const tempB = line2.a.x * line2.b.y - line2.a.y * line2.b.x;
  const xCoor = (tempA * z2 - z1 * tempB) / dist;
  const yCoor = (tempA * z4 - z3 * tempB) / dist;

  if (
    xCoor < Math.min(line1.a.x, line1.b.x) ||
    xCoor > Math.max(line1.a.x, line1.b.x) ||
    xCoor < Math.min(line2.a.x, line2.b.x) ||
    xCoor > Math.max(line2.a.x, line2.b.x)
  ) {
    return null;
  }
  if (
    yCoor < Math.min(line1.a.y, line1.b.y) ||
    yCoor > Math.max(line1.a.y, line1.b.y) ||
    yCoor < Math.min(line2.a.y, line2.b.y) ||
    yCoor > Math.max(line2.a.y, line2.b.y)
  ) {
    return null;
  }

  return new Point(xCoor, yCoor);
};
