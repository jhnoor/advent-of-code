import { Component, OnInit } from '@angular/core';
import { input } from '../input';

@Component({
  selector: 'app-day6o2',
  templateUrl: './day6o2.component.html',
  styleUrls: ['./day6o2.component.scss']
})
export class Day6o2Component implements OnInit {
  puzzleInput = [...input];
  allNodes: Node[] = [];
  result: number;

  ngOnInit() {
    for (const line of this.puzzleInput) {
      const [parentName, childName] = line.split(')');
      const parent = findNodeByName(parentName, this.allNodes) || this.createNode(parentName);
      let child = findNodeByName(childName, this.allNodes);

      if (child) {
        child.parent = parent;
      } else {
        child = this.createNode(childName, parent);
      }

      parent.children.push(child);
    }

    this.djikstra('YOU');
    this.result = findNodeByName('SAN', this.allNodes).distanceToStartNode - 2;
  }

  djikstra(startNodeName: string) {
    const startNode = findNodeByName(startNodeName, this.allNodes);
    const unvisitedNodes = [...this.allNodes];
    startNode.distanceToStartNode = 0;

    while (unvisitedNodes.length > 0) {
      const currentNode = unvisitedNodes.reduce((prev, current) =>
        prev.distanceToStartNode < current.distanceToStartNode ? prev : current
      );

      const unvisitedNeighbours = currentNode.neighbours().filter(node => node && !node.visited);
      for (const neighbourNode of unvisitedNeighbours) {
        const distanceToStartNode = currentNode.distanceToStartNode + 1;
        if (distanceToStartNode < neighbourNode.distanceToStartNode) {
          neighbourNode.distanceToStartNode = distanceToStartNode;
          neighbourNode.prev = currentNode;
        }
      }
      currentNode.visited = true;
      unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);
    }

  }

  createNode(orbiteeName: string, orbits?: Node): Node {
    const node = new Node(orbiteeName, orbits);
    this.allNodes.push(node);
    return node;
  }
}

const findNodeByName = (searchName: string, collection: Node[]): Node => {
  return collection.find(node => node.name === searchName);
};
const findIndexOfNodeByName = (searchName: string, collection: Node[]): number => {
  return collection.findIndex(node => node.name === searchName);
};

class Node {
  name: string;
  parent: Node;
  children: Node[] = [];
  visited: boolean;
  prev: Node;
  distanceToStartNode = Infinity;

  constructor(name: string, parent?: Node) {
    this.name = name;
    this.parent = parent;
  }

  neighbours(): Node[] {
    return [this.parent, ...this.children];
  }
}
