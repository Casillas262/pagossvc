import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DolarTodayComponent } from './dolar-today.component';

describe('DolarTodayComponent', () => {
  let component: DolarTodayComponent;
  let fixture: ComponentFixture<DolarTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DolarTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DolarTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
