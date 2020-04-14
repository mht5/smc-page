import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-price',
  templateUrl: './import-price.component.html',
  styleUrls: ['./import-price.component.css']
})
export class ImportPriceComponent implements OnInit {
  title = 'Import Stock Price';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  importStockPrice() {
    console.log('importing...');
    this.router.navigate(['/company/import-price-success']);
  }

}
