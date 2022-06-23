import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPedidosVComponent } from './add-edit-pedidos-v.component';

describe('AddEditPedidosVComponent', () => {
  let component: AddEditPedidosVComponent;
  let fixture: ComponentFixture<AddEditPedidosVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPedidosVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPedidosVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
