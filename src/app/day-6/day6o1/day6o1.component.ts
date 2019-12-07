import { Component, OnInit } from '@angular/core';
import { input } from '../input';

@Component({
  selector: 'app-day6o1',
  templateUrl: './day6o1.component.html',
  styleUrls: ['./day6o1.component.scss']
})
export class Day6o1Component implements OnInit {
  puzzleInput = [...input];
  allObjekts: Objekt[] = [];
  result: number;

  ngOnInit() {
    for (const line of this.puzzleInput) {
      // Orbitees are the objekts that are orbited, orbiters orbit them
      // Confused yet?
      const [orbiteeName, orbiterName] = line.split(')');

      const orbiteeObjekt =
        findObjectByName(orbiteeName, this.allObjekts) || this.createObjekt(orbiteeName);

      let orbiterObjekt = findObjectByName(orbiterName, this.allObjekts);

      if (orbiterObjekt) {
        orbiterObjekt.orbits = orbiteeObjekt;
      } else {
        orbiterObjekt = this.createObjekt(orbiterName, orbiteeObjekt);
      }
    }

    this.result = this.allObjekts
      .map(obj => obj.countDirectAndIndirectOrbits())
      .reduce((p, c) => p + c, 0);
  }

  createObjekt(orbiteeName: string, orbits?: Objekt): Objekt {
    const obj = new Objekt(orbiteeName, orbits);
    this.allObjekts.push(obj);
    return obj;
  }
}

const findObjectByName = (searchName: string, collection: Objekt[]): Objekt => {
  return collection.find(obj => obj.name === searchName);
};

class Objekt {
  orbits: Objekt;
  name: string;

  constructor(name: string, orbits?: Objekt) {
    this.name = name;
    this.orbits = orbits;
  }

  countDirectAndIndirectOrbits(): number {
    if (this.orbits === undefined) {
      return 0;
    } else {
      return this.orbits.countDirectAndIndirectOrbits() + 1;
    }
  }
}
