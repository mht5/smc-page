import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Company } from 'src/app/company/models/company.model';
import { CompanyService } from 'src/app/company/services/company.service';
import { UserService } from 'src/app/core/services/user.service';

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
    private userService: UserService
  ) {
    this.companies = [
      {
        'id': 1,
        'name': 'company1',
        'sectorId': 'sector1',
        'turnover': 123.321,
        'ceo': 'C. Lock',
        'boardOfDirectors': ' J. Peters, N. Holt, M, Sanders',
        'listedInStockExchanges': 'Y',
        'briefWriteup': 'this is company 1'
      }, {
        'id': 2,
        'name': 'company2',
        'sectorId': 'sector1',
        'turnover': 111.222,
        'ceo': 'C. Lock',
        'boardOfDirectors': ' J. Peters, N. Holt, M, Sanders',
        'listedInStockExchanges': 'Y',
        'briefWriteup': 'this is company 2'
      }, {
        'id': 3,
        'name': 'company3',
        'sectorId': 'sector2',
        'turnover': 222.333,
        'ceo': 'C. Lock',
        'boardOfDirectors': ' J. Peters, N. Holt, M, Sanders',
        'listedInStockExchanges': 'Y',
        'briefWriteup': 'this is company 3'
      }, {
        'id': 4,
        'name': 'company4',
        'sectorId': 'sector2',
        'turnover': 333.444,
        'ceo': 'C. Lock',
        'boardOfDirectors': ' J. Peters, N. Holt, M, Sanders',
        'listedInStockExchanges': 'Y',
        'briefWriteup': 'this is company 4'
      }, {
        'id': 5,
        'name': 'company5',
        'sectorId': 'sector5',
        'turnover': 444.555,
        'ceo': 'C. Lock',
        'boardOfDirectors': ' J. Peters, N. Holt, M, Sanders',
        'listedInStockExchanges': 'Y',
        'briefWriteup': 'this is company 5'
      }
    ];
    this.dataSource = new MatTableDataSource(this.companies);
    this.isAdmin = this.userService.isAdmin();
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

  addCompany() {
    console.log('going to add new company.');
    this.router.navigate(['/company/add']);
  }

  findCompany() {
    console.log('find company: ' + this.companyName);
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
