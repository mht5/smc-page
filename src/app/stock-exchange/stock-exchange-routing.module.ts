import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { ListExchangesComponent } from './components/list-exchanges/list-exchanges.component';
import { AddExchangeComponent } from './components/add-exchange/add-exchange.component';

const routes: Routes = [
  { path: '', component: ListExchangesComponent },
  { path: 'add', component: AddExchangeComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      RouterModule,
      CoreModule
    ],
    declarations: [
      ListExchangesComponent,
      AddExchangeComponent
    ],
    exports: [RouterModule]
})
export class StockExchangeRoutingModule { }
