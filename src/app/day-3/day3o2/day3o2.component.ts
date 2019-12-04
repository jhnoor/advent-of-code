import { Component, OnInit } from '@angular/core';
import { Point, lineSegments, findIntersection, Cardinality, LineSegment } from '../util';
import { exampleInput, testInput, input } from '../input';

@Component({
  selector: 'app-day3o2',
  templateUrl: './day3o2.component.html',
  styleUrls: ['./day3o2.component.scss']
})
export class Day3o2Component implements OnInit {
  readonly origoPoint: Point = new Point(0, 0);

  width = 800;
  height = 600;
  viewBox = '0 0 800 600';
  scaleFactor = 0.5;

  input: string[][] = input;
  paths: string[] = [];
  points: Point[][] = [];

  intersectionPointsWithSegments: Array<{
    intersectPoint: Point;
    involvedSegments: [LineSegment, LineSegment];
  }> = [];

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

    this.findAllIntersections();
    this.result = this.fewestStepsToIntersection();
  }

  fewestStepsToIntersection(): number {
    const line1 = this.points[0];
    const line2 = this.points[1];

    const result = this.intersectionPointsWithSegments
      .filter(isp => !(isp.intersectPoint.x === 0 && isp.intersectPoint.y === 0))
      .map(isp => {
        const line1Segment = isp.involvedSegments[0];
        const line1PathUntilSegmentPoint = this.getPathUntilSegmentPoint(
          line1Segment.a,
          line1,
          isp.intersectPoint
        );
        const line1StepsForPath = this.getStepsForPath(line1PathUntilSegmentPoint);

        const line2Segment = isp.involvedSegments[1];
        const line2PathUntilSegmentPoint = this.getPathUntilSegmentPoint(
          line2Segment.a,
          line2,
          isp.intersectPoint
        );
        const line2StepsForPath = this.getStepsForPath(line2PathUntilSegmentPoint);

        return line1StepsForPath + line2StepsForPath;
      });

    return Math.min(...result);
  }

  getPathUntilSegmentPoint(segmentStart: Point, path: Point[], intersectPoint: Point): Point[] {
    const pathUntilSegmentPoint = [this.origoPoint];
    for (const point of path) {
      if (point.equals(segmentStart)) {
        pathUntilSegmentPoint.push(...[point, intersectPoint]);
        break;
      }
      pathUntilSegmentPoint.push(point);
    }

    return pathUntilSegmentPoint;
  }

  getStepsForPath(path: Point[]): number {
    let length = 0;
    for (let i = 0; i < path.length - 1; i += 1) {
      length += path[i].manhattanDistanceToPoint(path[i + 1]);
    }
    return length;
  }

  /**
   * Finds all the intersecting points between the arrays of lines
   */
  findAllIntersections() {
    const line1Segments = lineSegments([this.origoPoint, ...this.points[0]]);
    const line2Segments = lineSegments([this.origoPoint, ...this.points[1]]);

    this.intersectionPointsWithSegments = [];

    // Do some magic
    line1Segments.forEach(line1Segment => {
      line2Segments.forEach(line2Segment => {
        const point = findIntersection(line1Segment, line2Segment);
        if (point) {
          this.intersectionPointsWithSegments.push({
            intersectPoint: point,
            involvedSegments: [line1Segment, line2Segment]
          });
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
