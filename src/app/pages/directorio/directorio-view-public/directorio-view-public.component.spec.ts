import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioViewPublicComponent } from './directorio-view-public.component';

describe('DirectorioViewPublicComponent', () => {
  let component: DirectorioViewPublicComponent;
  let fixture: ComponentFixture<DirectorioViewPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioViewPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioViewPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
