import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  msg: string[];

  constructor(private displayService: DisplayService) { }

  ngOnInit() {
    this.displayService.getMsg().subscribe(
      msg => this.msg = msg
    )
  }

}
