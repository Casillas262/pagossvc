import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesIndexComponent } from './currencies-index.component';

describe('CurrenciesIndexComponent', () => {
  let component: CurrenciesIndexComponent;
  let fixture: ComponentFixture<CurrenciesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
