import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { get } from 'src/api';
import { IList } from 'src/types';

interface IView {
  list: IList;
  mode: 'view' | 'edit';
}

@Component({
  selector: 'page-lists',
  styleUrls: ['./lists.component.css'],
  templateUrl: './lists.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ListsComponent implements OnInit {
  lists: IList[] = [];

  view: IView | null = null;
  viewingList: IList | null = null;

  setView = (id: number, mode: 'view' | 'edit') => {
    const selectedList = this.lists.find(list => list.id === id);
    if (!selectedList) return;
    this.view = {
      list: selectedList,
      mode
    }
  }

  ngOnInit() {
    get('/lists').then((result) => {
      this.lists = result;
    }).catch(err => console.warn(err));
  }
}