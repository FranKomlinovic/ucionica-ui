import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";
import { ConfirmationService, MenuItem } from "primeng/api";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
	menuItems: MenuItem[] = [];
	nonAdminMenu: MenuItem[] = [];
	adminMenu: MenuItem[] = [];
	items: MenuItem[] = this.nonAdminMenu;
	activeItemIndex: number = 0;
	menuVisible: boolean = false;

	title: string = "Učionica";

	isMobileSize = window.innerWidth < 500;

	constructor(
		private confirmationService: ConfirmationService,
		private router: Router
	) {}

	selectItem(i: number) {
		this.activeItemIndex = i;
		this.router.navigate([this.menuItems[i].routerLink]);
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (this.isMobileSize) {
			this.menuVisible = false;
		}
	}

	toggleMenu() {
		this.menuVisible = !this.menuVisible;
	}

	listenToWindowResize() {
		window.onresize = () => {
			this.isMobileSize = window.innerWidth < 500;
			this.menuVisible = window.innerWidth > 500;
		};
	}

	ngOnInit() {
		this.menuVisible = window.innerWidth > 500;
		this.listenToWindowResize();

		this.adminMenu = [
			{ icon: "pi pi-fw pi-home", routerLink: "/", label: "Home" },
			{
				icon: "pi pi-fw pi-users",
				routerLink: "/stays",
				label: "Trenutni dejstvenici"
			},
			{
				icon: "pi pi-fw pi-money-bill",
				routerLink: "/payments",
				label: "Zadnje uplate"
			},
			{
				icon: "pi pi-fw pi-eye-slash",
				routerLink: "/debtors",
				label: "Stup srama"
			},
			{
				icon: "pi pi-fw pi-chart-line",
				routerLink: "/creditors",
				label: "Stup ponosa"
			},
			{
				icon: "pi pi-fw pi-user-plus",
				routerLink: "/user-create",
				label: "Dodaj dejstvenika"
			},
			{
				icon: "pi pi-fw pi-calendar",
				routerLink: "/events",
				label: "Događaji"
			},
			{
				icon: "pi pi-fw pi-sign-out",
				command: () => this.confirmSignOut(),
				styleClass: "last"
			}
		];

		this.nonAdminMenu = [
			{ icon: "pi pi-fw pi-home", routerLink: "/", label: "Home" },
			{
				icon: "pi pi-fw pi-users",
				routerLink: "/stays",
				label: "Trenutni dejstvenici"
			},
			{
				icon: "pi pi-fw pi-sign-out",
				command: () => this.confirmSignOut(),
				styleClass: "last col-fixed"
			}
		];

		Auth.currentAuthenticatedUser().then(data => {
			const groups =
				data.signInUserSession.accessToken.payload["cognito:groups"];
			if (!groups) {
				this.menuItems = this.nonAdminMenu;
				return;
			}
			if (groups.includes("Generali")) {
				this.menuItems = this.adminMenu;
			}
		});
	}

	signOut() {
		Auth.signOut();
	}

	confirmSignOut() {
		this.confirmationService.confirm({
			message: "Jeste li sigurni da se želite odjaviti?",
			accept: () => {
				this.signOut();
			},
			reject: () => {
				this.confirmationService.close();
			}
		});
	}
}
