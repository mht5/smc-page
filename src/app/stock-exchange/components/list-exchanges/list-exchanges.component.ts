import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { StockExchange } from 'src/app/stock-exchange/models/stock-exchange.model';
import { StockExchangeService } from 'src/app/stock-exchange/services/stock-exchange.service';

@Component({
  selector: 'app-list-exchanges',
  templateUrl: './list-exchanges.component.html',
  styleUrls: ['./list-exchanges.component.css']
})
export class ListExchangesComponent implements OnInit {
  title = 'Stock Exchanges';
  stockExchanges: StockExchange[];
  displayedColumns: string[] = ['id', 'name', 'brief', 'contactAddress', 'remarks'];
  dataSource: MatTableDataSource<StockExchange>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private stockExchangeService: StockExchangeService
  ) {
    this.stockExchanges = this.stockExchangeService.getStockExchanges();
    this.dataSource = new MatTableDataSource(this.stockExchanges);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addStockExchange() {
    console.log('going to add new stock exchange.');
    this.router.navigate(['/stock-exchange/add']);
  }

}
