import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ucionica-menu',
  templateUrl: './ucionica-menu.component.html',
  styleUrls: ['./ucionica-menu.component.css']
})
export class UcionicaMenuComponent implements OnInit {

  @Input() userId: string = "";
  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Dejstva', icon: 'pi pi-fw pi-fast-forward', routerLink: '/stays'
      },
      {label: 'Uplate', icon: 'pi pi-fw pi-euro', routerLink: '/payments'},
      {label: 'Dužnici', icon: 'pi pi-fw pi-credit-card', routerLink: '/debtors'},
      {label: 'Korisnici', icon: 'pi pi-fw pi-id-card', routerLink: '/' + this.userId},

    ];
  }

}
