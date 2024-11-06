import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateOrderComponent } from './form-create-order.component';

describe('FormCreateOrderComponent', () => {
  let component: FormCreateOrderComponent;
  let fixture: ComponentFixture<FormCreateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
