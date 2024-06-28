import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasViajesComponent } from './listas-viajes.component';

describe('ListasViajesComponent', () => {
  let component: ListasViajesComponent;
  let fixture: ComponentFixture<ListasViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasViajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
