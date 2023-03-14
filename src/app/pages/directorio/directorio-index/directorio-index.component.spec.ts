import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioIndexComponent } from './directorio-index.component';

describe('DirectorioIndexComponent', () => {
  let component: DirectorioIndexComponent;
  let fixture: ComponentFixture<DirectorioIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
