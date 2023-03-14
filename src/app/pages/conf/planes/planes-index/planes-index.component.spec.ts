import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesIndexComponent } from './planes-index.component';

describe('PlanesIndexComponent', () => {
  let component: PlanesIndexComponent;
  let fixture: ComponentFixture<PlanesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
