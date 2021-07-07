import { Component, Input, OnInit } from "@angular/core";
import { IList } from "src/types";

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnInit {
  @Input() list!: IList;
  @Input() members!: string;

  listItems: string[] = [];

  ngOnInit() {
    this.listItems = this.members.split('~&~');
  }
}