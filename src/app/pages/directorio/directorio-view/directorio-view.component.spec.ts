import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioViewComponent } from './directorio-view.component';

describe('DirectorioViewComponent', () => {
  let component: DirectorioViewComponent;
  let fixture: ComponentFixture<DirectorioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
