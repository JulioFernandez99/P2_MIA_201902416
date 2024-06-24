import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAutosComponent } from './registro-autos.component';

describe('RegistroAutosComponent', () => {
  let component: RegistroAutosComponent;
  let fixture: ComponentFixture<RegistroAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
