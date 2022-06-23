import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPedidosComponent } from './show-pedidos.component';

describe('ShowPedidosComponent', () => {
  let component: ShowPedidosComponent;
  let fixture: ComponentFixture<ShowPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
