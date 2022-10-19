import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeicoloPasseggeriComponent } from './veicolo-passeggeri.component';

describe('VeicoloPasseggeriComponent', () => {
  let component: VeicoloPasseggeriComponent;
  let fixture: ComponentFixture<VeicoloPasseggeriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeicoloPasseggeriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeicoloPasseggeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
