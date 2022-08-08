import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FruitWithPhoto } from '@type/fruit';

@Component({
  selector: 'fruity-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input("fruit") fruit$: Observable<FruitWithPhoto>;
  @Output("closeDrawer") closeDrawer = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeDrawer.emit();
  }
}
