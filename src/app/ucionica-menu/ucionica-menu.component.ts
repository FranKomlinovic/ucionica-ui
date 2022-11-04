import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-ucionica-menu',
  templateUrl: './ucionica-menu.component.html',
  styleUrls: ['./ucionica-menu.component.scss'],
})
export class UcionicaMenuComponent implements OnInit {
  nonAdminMenu: MenuItem[] = [];
  adminMenu: MenuItem[] = [];
  items: MenuItem[] = this.nonAdminMenu;
  activeItem: MenuItem;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.adminMenu = [
      { icon: 'pi pi-fw pi-home', routerLink: '/' },
      { icon: 'pi pi-fw pi-users', routerLink: '/stays' },
      { icon: 'pi pi-fw pi-euro', routerLink: '/payments' },
      { icon: 'pi pi-fw pi-search-minus', routerLink: '/debtors' },
      { icon: 'pi pi-fw pi-search-plus', routerLink: '/creditors' },
      { icon: 'pi pi-fw pi-user-plus', routerLink: '/user-create' },
      { icon: 'pi pi-fw pi-sign-out', command: () => this.confirmSignOut() },
    ];

    this.nonAdminMenu = [
      { icon: 'pi pi-fw pi-home', routerLink: '/' },
      { icon: 'pi pi-fw pi-users', routerLink: '/stays' },
      { icon: 'pi pi-fw pi-sign-out', command: () => this.confirmSignOut() },
    ];

    Auth.currentAuthenticatedUser().then((data) => {
      let groups = data.signInUserSession.accessToken.payload['cognito:groups'];
      if (groups === undefined) {
        this.items = this.nonAdminMenu;
        return;
      }
      if (groups.includes('Generali')) {
        this.items = this.adminMenu;
      }
    });

    this.activeItem = this.items[0];
  }

  signOut() {
    Auth.signOut();
  }

  confirmSignOut() {
    this.confirmationService.confirm({
      message: 'Jeste li sigurni da se želite odjaviti?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.signOut();
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
