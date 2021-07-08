import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { get } from 'src/api';
import { IList } from 'src/types';

interface IView {
  list: number;
  mode: 'view' | 'edit';
}

@Component({
  selector: 'page-lists',
  templateUrl: './lists.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ListsComponent implements OnInit {
  lists: { [listId: string]: IList } = {};
  view: IView | null = null;

  setView = (id: number, mode: 'view' | 'edit') => {
    const selectedList = this.lists[id];
    if (!selectedList) return;
    this.view = {
      list: selectedList.id,
      mode
    }
  }

  fetchLists = () => {
    get('/lists').then((result: any[]) => {
      const lists = result.reduce((obj, list) => {
        obj[list.id] = list;
        return obj;
      }, {});
      this.lists = lists;
    }).catch(err => console.warn(err));
  }

  ngOnInit() {
    this.fetchLists();
  }
}