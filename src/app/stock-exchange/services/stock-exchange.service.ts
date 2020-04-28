import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  constructor() { }

  getStockExchanges() {
    return [
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
  }
}
