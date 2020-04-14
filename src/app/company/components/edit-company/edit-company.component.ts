import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/company/models/company.model';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  title = 'Edit Company';
  companyId: string;
  company: Company;
  companyBeforeEdit = {};
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.company = this.companyService.getCompany(this.companyId);
    Object.assign(this.companyBeforeEdit, this.company);
  }

  update() {
    console.log('update company: ', this.company);
  }

  clear() {
    console.log(this.companyBeforeEdit);
    Object.assign(this.company, this.companyBeforeEdit);
  }

}
