import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesEditComponent } from './planes-edit.component';

describe('PlanesEditComponent', () => {
  let component: PlanesEditComponent;
  let fixture: ComponentFixture<PlanesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
