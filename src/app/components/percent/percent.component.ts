import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percent',
  templateUrl: './percent.component.html',
  styleUrls: ['./percent.component.css']
})
export class PercentComponent implements OnInit {

  @Input() num: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
