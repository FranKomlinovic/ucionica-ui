import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ucionica-menu',
  templateUrl: './ucionica-menu.component.html',
  styleUrls: ['./ucionica-menu.component.css']
})
export class UcionicaMenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Dejstva', icon: 'pi pi-fw pi-plus'
      },
      {label: 'Uplate', icon: 'pi pi-fw pi-download'},
      {label: 'Dužnici', icon: 'pi pi-fw pi-refresh'}
    ];
  }

}
