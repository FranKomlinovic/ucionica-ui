import { Component, OnInit } from '@angular/core';
import { IHighestDebt } from '../../interfaces/highest-debt.interface';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-highest-credit',
  templateUrl: './highest-credit.component.html',
  styleUrls: ['./highest-credit.component.scss'],
})
export class HighestCreditComponent implements OnInit {
  highestCredit: IHighestDebt[] = [];
  spinnerOn: boolean = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getHighestDebt();
  }

  getHighestDebt() {
    this.spinnerOn = true;
    this.backendService.getHighestCredit().subscribe((data) => {
      this.highestCredit = data;
      this.spinnerOn = false;
    });
  }
}
