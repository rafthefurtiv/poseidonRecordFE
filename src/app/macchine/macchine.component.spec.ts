import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacchineComponent } from './macchine.component';

describe('MacchineComponent', () => {
  let component: MacchineComponent;
  let fixture: ComponentFixture<MacchineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacchineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacchineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
