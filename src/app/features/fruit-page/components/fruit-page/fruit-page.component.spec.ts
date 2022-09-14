import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitPageComponent } from './fruit-page.component';

describe('FruitPageComponent', () => {
  let component: FruitPageComponent;
  let fixture: ComponentFixture<FruitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
