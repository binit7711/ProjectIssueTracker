import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaboratorComponent } from './add-collaborator.component';

describe('AddCollaboratorComponent', () => {
  let component: AddCollaboratorComponent;
  let fixture: ComponentFixture<AddCollaboratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddCollaboratorComponent]
    });
    fixture = TestBed.createComponent(AddCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
