import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() diameter = 32;
  @Input() stroke = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
