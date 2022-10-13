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
        label: 'Dejstva', icon: 'pi pi-fw pi-fast-forward', routerLink: '/'
      },
      {label: 'Uplate', icon: 'pi pi-fw pi-euro', routerLink: '/payments'},
      {label: 'Dužnici', icon: 'pi pi-fw pi-credit-card', routerLink: '/debtor'},
      {label: 'Korisnici', icon: 'pi pi-fw pi-id-card', routerLink: '/users'},

    ];
  }

}
