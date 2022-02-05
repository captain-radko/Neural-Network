import { Component, OnInit } from "@angular/core";
import { TickerData } from "app/models/Ticker";
import { TickerService } from "app/services/ticker.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  tickerData: TickerData;
  ticker: string = "";
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private tickerService: TickerService) {}

  ngOnInit(): void {}

  getTickerData(): void {
    this.isLoading = true;
    this.tickerService
      .getTickerData(this.ticker)
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          this.hasError = true;
          console.log("Error", err);
          return of(<TickerData>{});
        })
      )
      .subscribe((data: TickerData) => {
        this.tickerData = data;
        this.isLoading = false;
      });
  }

  onClear(): void {
    this.ticker = "";
    this.tickerData = undefined;
  }

  onEnter() {
    this.getTickerData();
  }
}
