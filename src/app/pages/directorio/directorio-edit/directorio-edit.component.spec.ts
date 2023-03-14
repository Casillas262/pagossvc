import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioEditComponent } from './directorio-edit.component';

describe('DirectorioEditComponent', () => {
  let component: DirectorioEditComponent;
  let fixture: ComponentFixture<DirectorioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
