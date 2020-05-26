import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Company } from 'src/app/company/models/company.model';
import { CompanyService } from 'src/app/company/services/company.service';
import { DisplayService } from 'src/app/core/services/display.service';
import { ConfigService } from 'src/app/core/services/config.service';

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
  sectorList: [];
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private configService: ConfigService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.company = this.companyService.getCompany(this.companyId);
    Object.assign(this.companyBeforeEdit, this.company);
    this.sectorList = this.configService.getSectorInfo();
    this.displayService.setMsg([]);
  }

  update() {
    console.log('update company: ', this.company);
    this.companyService.updateCompany(this.company).subscribe(
      data => {
        if (data) {
          this.displayService.setMsg(['success', 'The company has been updated.']);
        } else {
          this.displayService.setMsg(['error', 'The company has not been updated.']);
        }
        Object.assign(this.companyBeforeEdit, this.company);
      },
      err => {
        console.log(err);
      }
    );
  }

  clear() {
    console.log(this.companyBeforeEdit);
    Object.assign(this.company, this.companyBeforeEdit);
  }

}
