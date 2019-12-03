export type Cardinality = 'U' | 'D' | 'L' | 'R';

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  manhattanDistanceToPoint(referencePoint: Point): number {
    return Math.abs(this.x - referencePoint.x) + Math.abs(this.y - referencePoint.y);
  }

  equals(point: Point) {
    return point.x === this.x && point.y === this.y;
  }
}

export class LineSegment {
  a: Point;
  b: Point;

  constructor(a: Point, b: Point) {
    this.a = a;
    this.b = b;
  }
}

export const lineSegments = (points: Point[]): LineSegment[] => {
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

export const findIntersection = (
  line1: LineSegment,
  line2: LineSegment
): Point | null => {
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
