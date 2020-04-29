/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserjobsComponent } from './userjobs.component';

describe('UserjobsComponent', () => {
  let component: UserjobsComponent;
  let fixture: ComponentFixture<UserjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
