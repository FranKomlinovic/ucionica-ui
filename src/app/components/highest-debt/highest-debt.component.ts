import { Component, OnInit } from '@angular/core';
import { IHighestDebt } from '../../interfaces/highest-debt.interface';
import { BackendService } from '../../backend.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-highest-debt',
  templateUrl: './highest-debt.component.html',
  styleUrls: ['./highest-debt.component.scss'],
})
export class HighestDebtComponent implements OnInit {
  highestDebt: IHighestDebt[] = [];

  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.getHighestDebt();
  }

  getHighestDebt() {
    this.backendService
      .getHighestDebt()
      //   .pipe(tap(() => this.feedbackService.spinner(false)))
      .subscribe((data) => {
        this.highestDebt = data;
        // this.feedbackService.spinner(false);
      });
  }
}
