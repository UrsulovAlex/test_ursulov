import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IMenu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input() menu: IMenu[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
