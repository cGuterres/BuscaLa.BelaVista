/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CondominiumEditComponent } from './condominium-edit.component';

describe('CondominiumEditComponent', () => {
  let component: CondominiumEditComponent;
  let fixture: ComponentFixture<CondominiumEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondominiumEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondominiumEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
