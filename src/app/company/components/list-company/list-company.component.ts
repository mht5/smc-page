import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Company } from 'src/app/company/models/company.model';
import { CompanyService } from 'src/app/company/services/company.service';
import { UserService } from 'src/app/core/services/user.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {
  title = 'Companies';
  companies: Company[];
  selectedCompany: Company;
  companyName: string;
  isAdmin: boolean;
  displayedColumns: string[] = ['radio', 'name', 'sectorId', 'turnover', 'ceo', 'boardOfDirectors', 'listedInStockExchanges', 'briefWriteup'];
  dataSource: MatTableDataSource<Company>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService,
    private displayService: DisplayService
  ) {
    this.getCompanyList();
    this.userService.isAdmin().subscribe(
      data => {
        this.isAdmin = data;
      },
      err => {
        console.log(err);
      }
    );
    this.displayService.setMsg([]);
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCompanyList() {
    this.companyService.getCompanyList().subscribe(
      data => {
        this.companies = data;
        this.dataSource = new MatTableDataSource(this.companies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  addCompany() {
    console.log('going to add new company.');
    this.router.navigate(['/company/add']);
  }

  findCompany() {
    console.log('find company: ' + this.companyName);
    if (this.companyName == undefined || this.companyName.length < 1) {
      this.companyService.getCompanyList().subscribe(
        data => {
          this.companies = data;
          this.dataSource = new MatTableDataSource(this.companies);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.selectedCompany = undefined;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.companyService.findCompanyByName(this.companyName).subscribe(
        data => {
          if (data != null) {
            this.companies = [];
            this.companies.push(data);
            this.dataSource = new MatTableDataSource(this.companies);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.selectedCompany = undefined;
          } else {
            this.displayService.setMsg(['warning', 'No company with name \'' + this.companyName + '\' was found.']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  updateSelected(company) {
    console.log('current selection: ' + company['id']);
    this.selectedCompany = company;
  }

  edit() {
    if (this.checkSelection()) {
      console.log('going to edit company ' + this.selectedCompany['id']);
      this.companyService.setCompany(this.selectedCompany);
      this.router.navigate(['/company/edit/' + this.selectedCompany['id']]);
    }
  }

  updateIpo() {
    if (this.checkSelection()) {
      console.log('going to update IPO ' + this.selectedCompany['id']);
      this.companyService.setCompany(this.selectedCompany);
      this.router.navigate(['/company/update-ipo/' + this.selectedCompany['id']]);
    }
  }

  checkMissingData() {
    if (this.checkSelection()) {
      console.log('check missing data for ' + this.selectedCompany['id']);
      this.companyService.setCompany(this.selectedCompany);
      this.router.navigate(['/company/missing-data/' + this.selectedCompany['id']]);
    }
  }

  deactivate() {
    if (this.checkSelection()) {
      console.log('going to deactivate company ' + this.selectedCompany['id']);
      this.companyService.deactivateCompany(this.selectedCompany['id']).subscribe(
        data => {
          if (data) {
            this.displayService.setMsg(['success', 'The company has been deactivated.']);
            this.findCompany();
          } else {
            this.displayService.setMsg(['error', 'The company has not been deactivated.']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  checkSelection() {
    if (this.selectedCompany == undefined) {
      alert('Please select 1 company to continue.');
      return false;
    }
    return true;
  }

}
