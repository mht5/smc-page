import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { IPO } from 'src/app/company/models/ipo.model';
import { IpoService } from 'src/app/company/services/ipo.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-list-ipo',
  templateUrl: './list-ipo.component.html',
  styleUrls: ['./list-ipo.component.css']
})
export class ListIpoComponent implements OnInit {
  title = 'List IPOs';
  ipos: IPO[];
  displayedColumns: string[] = ['id', 'stockExchangeId', 'stockCode', 'pricePerShare', 'numberOfShares', 'openDateTime', 'remarks'];
  dataSource: MatTableDataSource<IPO>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ipoService: IpoService,
    private displayService: DisplayService
  ) {
    this.getPlannedIpos();
  }

  ngOnInit() {
    this.displayService.setMsg([]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPlannedIpos() {
    this.ipoService.getPlannedIpos().subscribe(
      data => {
        this.ipos = data;
        this.dataSource = new MatTableDataSource(this.ipos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

}
