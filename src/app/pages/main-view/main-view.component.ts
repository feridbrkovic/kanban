import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CdkDropList, CdkDrag, NgFor],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {

  constructor() {}

  getConnectedDropLists(columnId: string): string[] {
    return this.board.columns
      .map((column) => column.name)
      .filter((id) => id !== columnId);
  }

  board: Board = new Board('Test Board', [
    new Column('1', 'Ideas', [
      'Some random idea',
      'This is another random idea',
      'Build an awesome application',
    ]),
    new Column('2', 'Todo', ['Lorem ipsum', 'foo', 'bar']),
    new Column('3', 'In Progress', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
    ]),
    new Column('4', 'Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog',
    ]),
  ]);

  ngOnInit() {
    this.loadBoard();
  }

  loadBoard() {
    const storedBoard = localStorage.getItem('board');
    if (storedBoard) {
      this.board = JSON.parse(storedBoard);
    } else {
      this.board = new Board('Test Board', [
        new Column('1', 'Ideas', [
          'Some random idea',
          'This is another random idea',
          'Build an awesome application',
        ]),
        new Column('2', 'Todo', ['Lorem ipsum', 'foo', 'bar']),
        new Column('3', 'In Progress', [
          'Get to work',
          'Pick up groceries',
          'Go home',
          'Fall asleep',
        ]),
        new Column('4', 'Done', [
          'Get up',
          'Brush teeth',
          'Take a shower',
          'Check e-mail',
          'Walk dog',
        ]),
      ]);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveBoard();
  }

  saveBoard() {
    localStorage.setItem('board', JSON.stringify(this.board));
  }
}
