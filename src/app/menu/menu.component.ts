import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    @Input() menuItems: MenuItem[] = [];

    nonAdminMenu: MenuItem[] = [];
    adminMenu: MenuItem[] = [];
    items: MenuItem[] = this.nonAdminMenu;
    activeItemIndex: number = 0;

    constructor(private confirmationService: ConfirmationService) {}

    selectItem(i: number) {
        this.activeItemIndex = i;
    }

    ngOnInit() {
        this.adminMenu = [
            { icon: 'pi pi-fw pi-home', routerLink: '/' },
            { icon: 'pi pi-fw pi-users', routerLink: '/stays' },
            { icon: 'pi pi-fw pi-euro', routerLink: '/payments' },
            { icon: 'pi pi-fw pi-search-minus', routerLink: '/debtors' },
            { icon: 'pi pi-fw pi-search-plus', routerLink: '/creditors' },
            { icon: 'pi pi-fw pi-user-plus', routerLink: '/user-create' },
            { icon: 'pi pi-fw pi-globe', routerLink: '/events' },
            {
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.confirmSignOut(),
                styleClass: 'last',
            },
        ];

        this.nonAdminMenu = [
            { icon: 'pi pi-fw pi-home', routerLink: '/' },
            { icon: 'pi pi-fw pi-users', routerLink: '/stays' },
            {
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.confirmSignOut(),
                styleClass: 'last col-fixed',
            },
        ];

        Auth.currentAuthenticatedUser().then((data) => {
            const groups =
                data.signInUserSession.accessToken.payload['cognito:groups'];
            if (!groups) {
                this.menuItems = this.nonAdminMenu;
                return;
            }
            if (groups.includes('Generali')) {
                this.menuItems = this.adminMenu;
            }
        });
    }

    signOut() {
        Auth.signOut();
    }

    confirmSignOut() {
        this.confirmationService.confirm({
            message: 'Jeste li sigurni da se želite odjaviti?',
            accept: () => {
                this.signOut();
            },
            reject: () => {
                this.confirmationService.close();
            },
        });
    }
}
