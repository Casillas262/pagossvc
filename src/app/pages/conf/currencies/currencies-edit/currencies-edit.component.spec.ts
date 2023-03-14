import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesEditComponent } from './currencies-edit.component';

describe('CurrenciesEditComponent', () => {
  let component: CurrenciesEditComponent;
  let fixture: ComponentFixture<CurrenciesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
