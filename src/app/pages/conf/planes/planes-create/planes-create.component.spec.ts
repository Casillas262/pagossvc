import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesCreateComponent } from './planes-create.component';

describe('PlanesCreateComponent', () => {
  let component: PlanesCreateComponent;
  let fixture: ComponentFixture<PlanesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
