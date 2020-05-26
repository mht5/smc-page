import { Component, OnInit } from '@angular/core';

import { StockService } from 'src/app/company/services/stock.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-import-price',
  templateUrl: './import-price.component.html',
  styleUrls: ['./import-price.component.css']
})
export class ImportPriceComponent implements OnInit {
  title = 'Import Stock Price';
  file: File;
  fileName = '';

  constructor(
    private stockService: StockService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.displayService.setMsg([]);
  }

  importStockPrice() {
    console.log('importing...');
    if (this.fileName == '') {
      this.displayService.setMsg(['error', 'Please select a File First']);
      window.scroll(0, 0);
    } else {
      this.stockService.importStockPrice(this.file).subscribe(
        data => {
          console.log(data);
          this.displayService.setMsg(['success', data + ' record(s) were imported successfully.']);
          // this.router.navigate(['/company/import-price-success']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  fileChange(fileInputEvent: any) {
    if (fileInputEvent.target.files.length > 0) {
      this.file = fileInputEvent.target.files[0];
      if (this.file.size / 1024 / 1024 > 3) {
        this.fileName = '';
        this.displayService.setMsg(['error', 'The size of uploaded file should be less than 3MB.']);
        window.scroll(0, 0);
        return;
      }
      this.fileName = fileInputEvent.target.files[0].name;
      this.displayService.setMsg([]);
    } else {
      this.fileName = '';
    }
  }

}
