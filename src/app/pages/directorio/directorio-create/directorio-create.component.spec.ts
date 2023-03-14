import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioCreateComponent } from './directorio-create.component';

describe('DirectorioCreateComponent', () => {
  let component: DirectorioCreateComponent;
  let fixture: ComponentFixture<DirectorioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
