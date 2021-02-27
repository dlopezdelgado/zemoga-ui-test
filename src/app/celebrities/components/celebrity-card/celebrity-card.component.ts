import { Component, Input, OnInit } from '@angular/core';
import { Celebrity } from 'src/app/shared/models/celebrity.model';

@Component({
  selector: 'app-celebrity-card',
  templateUrl: './celebrity-card.component.html',
  styleUrls: ['./celebrity-card.component.scss']
})
export class CelebrityCardComponent implements OnInit {

  @Input() id: string | undefined;
  @Input() celebrity: Celebrity | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
