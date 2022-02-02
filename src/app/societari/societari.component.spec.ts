import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietariComponent } from './societari.component';

describe('SocietariComponent', () => {
  let component: SocietariComponent;
  let fixture: ComponentFixture<SocietariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
