import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { StockExchange } from 'src/app/stock-exchange/models/stock-exchange.model';

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
    private router: Router
  ) {
    this.stockExchanges = [
      {
        'id': 1,
        'name': 'exchange1',
        'brief': 'brief1',
        'contactAddress': 'contactAddress1',
        'remarks': 'remarks1'
      },
      {
        'id': 2,
        'name': 'exchange2',
        'brief': 'brief2',
        'contactAddress': 'contactAddress2'
      },
      {
        'id': 3,
        'name': 'exchange3',
        'brief': 'brief3',
        'contactAddress': 'contactAddress3',
        'remarks': 'remarks3'
      },
      {
        'id': 4,
        'name': 'exchange4',
        'brief': 'brief4',
        'contactAddress': 'contactAddress4'
      },
      {
        'id': 5,
        'name': 'exchange5',
        'brief': 'brief5',
        'contactAddress': 'contactAddress5',
        'remarks': 'remarks5'
      },
    ];
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
