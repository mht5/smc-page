import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { UpdateIpoComponent } from './components/update-ipo/update-ipo.component';
import { ImportPriceComponent } from './components/import-price/import-price.component';
import { ImportPriceSuccessComponent } from './components/import-price-success/import-price-success.component';
import { MissingDataComponent } from './components/missing-data/missing-data.component';
import { ListIpoComponent } from './components/list-ipo/list-ipo.component';
import { CompareCompaniesComponent } from './components/compare-companies/compare-companies.component';

const routes: Routes = [
  { path: '', component: ListCompanyComponent },
  { path: 'add', component: AddCompanyComponent },
  { path: 'edit/:companyId', component: EditCompanyComponent },
  { path: 'update-ipo/:companyId', component: UpdateIpoComponent },
  { path: 'list-ipo', component: ListIpoComponent },
  { path: 'import-price', component: ImportPriceComponent },
  { path: 'import-price-success', component: ImportPriceSuccessComponent },
  { path: 'missing-data/:companyId', component: MissingDataComponent },
  { path: 'compare-companies', component: CompareCompaniesComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      RouterModule,
      CoreModule
    ],
    declarations: [
      ListCompanyComponent,
      AddCompanyComponent,
      EditCompanyComponent,
      UpdateIpoComponent,
      ImportPriceComponent,
      ImportPriceSuccessComponent,
      MissingDataComponent,
      ListIpoComponent,
      CompareCompaniesComponent
    ],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }
